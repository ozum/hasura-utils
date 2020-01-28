// GREAT HELP FROM:
// https://www.codegram.com/blog/nuxt-typescript-apollo-a-bumpy-road/
// https://learn.hasura.io/graphql/vue/introduction

/* eslint-disable no-plusplus */

import fetch from "node-fetch";
import pgStructure, { Db, Table } from "pg-structure";
import {
  formatAndWriteData,
  getTableName,
  getSingleObjectName,
  getMultipleObjectName,
  getHasuraCacheRedirectMapSource,
  getColumnNames,
  writeMigration,
} from "./helper";
import { trackTable, untrackTable, createPermission, dropPermission } from "./migration-commands";

require("dotenv").config();

const OPERATIONS: Operation[] = ["insert", "select", "update", "delete"];

interface HasuraTableName {
  schema: string;
  name: string;
}

interface MetaData {
  version: number;
  tables: Array<{ table: HasuraTableName; configuration: Record<string, string> }>;
}

export type NameFunction = (table: string, schema?: string) => string;
export type Operation = "insert" | "select" | "update" | "delete";
export type TableFilterFunction = (table: Table) => boolean;

export interface Options {
  url?: string;
  adminSecret?: string;
  database: string;
  user: string;
  password: string;
  includeSchemas?: string[];
  singleObjectNameFunction?: NameFunction;
  multipleObjectNameFunction?: NameFunction;
  tableNameFunction?: NameFunction;
}

export default class HasuraUtils {
  private readonly adminSecret: string;
  private readonly url: string;
  private readonly getSingleObjectName: NameFunction;
  private readonly getMultipleObjectName: NameFunction;
  private readonly getTableName: NameFunction;
  private db!: Db;

  private constructor({
    url,
    adminSecret,
    singleObjectNameFunction,
    multipleObjectNameFunction,
    tableNameFunction,
  }: {
    url: string;
    adminSecret: string;
    singleObjectNameFunction: NameFunction;
    multipleObjectNameFunction: NameFunction;
    tableNameFunction: NameFunction;
  }) {
    this.adminSecret = adminSecret;
    this.url = url;
    this.getSingleObjectName = singleObjectNameFunction;
    this.getMultipleObjectName = multipleObjectNameFunction;
    this.getTableName = tableNameFunction;
  }

  public static async create(
    {
      url = process.env["GRAPHQL-URL"] || "http://localhost:8080/v1/query",
      adminSecret = process.env["X-HASURA-ADMIN-SECRET"] || "",
      database,
      user,
      password,
      includeSchemas = ["public"],
      singleObjectNameFunction = getSingleObjectName,
      multipleObjectNameFunction = getMultipleObjectName,
      tableNameFunction = getTableName,
    }: Options = {} as any
  ): Promise<HasuraUtils> {
    const hasuraUtils = new HasuraUtils({
      url,
      adminSecret,
      singleObjectNameFunction,
      multipleObjectNameFunction,
      tableNameFunction,
    });
    hasuraUtils.db = await pgStructure({ database, user, password }, { includeSchemas });
    return hasuraUtils;
  }

  private get namingFunctions() {
    return {
      getSingleObjectName: this.getSingleObjectName,
      getMultipleObjectName: this.getMultipleObjectName,
      getTableName: this.getTableName,
    };
  }

  private getFilteredTables(filter?: TableFilterFunction): Table[] {
    return filter ? this.db.tables.filter(filter) : this.db.tables;
  }

  public async getMetaData(): Promise<MetaData> {
    const response: any = await fetch(this.url, {
      method: "post",
      body: JSON.stringify({
        type: "export_metadata",
        args: {},
      }),
      headers: { "Content-Type": "application/json", "x-hasura-admin-secret": this.adminSecret },
    });
    return response.json();
  }

  async getTrackedTables(): Promise<Table[]> {
    const metaData = await this.getMetaData();
    return metaData.tables.map(table => this.db.schemas.get(table.table.schema).tables.get(table.table.name));
  }

  public async writeMigrationsCreatePermissions({
    filter,
    dir,
    excludeColumns = { insert: [], select: [], update: [], delete: [] },
    role,
  }: {
    filter?: TableFilterFunction;
    dir: string;
    excludeColumns?: Record<Operation, string[]>;
    role: string;
  }): Promise<string | object> {
    const tables = this.getFilteredTables(filter);
    const up = tables.flatMap(table =>
      OPERATIONS.map(operation =>
        createPermission(table.name, table.schema.name, {
          operation,
          role,
          columns: getColumnNames(table, excludeColumns[operation] || []),
        })
      )
    );
    const down = tables.flatMap(table => OPERATIONS.map(operation => dropPermission(table.name, table.schema.name, { operation, role })));
    return writeMigration(dir, up, down);
  }

  public async writeMigrationsTrackTable({ filter, dir }: { filter?: TableFilterFunction; dir: string }): Promise<any> {
    const tables = this.getFilteredTables(filter);
    const up = tables.map(table => trackTable(table.name, table.schema.name, this.namingFunctions));
    const down = tables.map(table => untrackTable(table.name, table.schema.name));
    return writeMigration(dir, up, down);
  }

  /**
   * Creates typescript file for mapping (`single object name` -> `table name`) to be used with cache redirects.
   *
   * @param file is the file to wirte mapping.
   * @param trackedTables are the names of the tables tracked by Hasura.
   * @param singleObjectNameFunction is the function to create single object name from table name.
   *
   * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects
   * @see https://www.apollographql.com/docs/react/performance/performance/
   *
   * @example
   * import { InMemoryCache, CacheResolver } from "apollo-cache-inmemory";
   *
   * function getHasuraCacheRedirects(redirectMap: Record<string, string>): Record<string, CacheResolver> {
   *   const result: Record<string, CacheResolver> = {};
   *   Object.entries(redirectMap).forEach(([singleRecordName, tableName]) => {
   *     result[singleRecordName] = (_, args, { getCacheKey }) => getCacheKey({ __typename: tableName, id: args.id });
   *   });
   *   return result;
   * }
   *
   * const cache: InMemoryCache = new InMemoryCache({
   *   cacheRedirects: {
   *     Query: { ...getHasuraCacheRedirects(apolloCacheRedirectMap) }
   *   }
   * });
   */
  async writeHasureCacheRedirectMap(
    file: string,
    { onlyTracked = false, filter = () => true }: { onlyTracked?: boolean; filter?: TableFilterFunction } = {}
  ): Promise<string> {
    const map: Record<string, string> = {};
    const trackedTables = (onlyTracked ? await this.getTrackedTables() : this.db.tables).filter(filter);
    trackedTables.forEach(table => {
      map[this.getSingleObjectName(table.name, table.schema.name)] = table.name;
    });
    return formatAndWriteData(getHasuraCacheRedirectMapSource(map), undefined, file);
  }
}
