import { join } from "path";
import { Table } from "pg-structure";
import YAML from "yaml";
import { camelize, pluralize, singularize } from "inflection";
import { outputFile } from "fs-extra";
import prettier from "prettier"; // eslint-disable-line import/no-extraneous-dependencies

export async function formatAndWriteData<T>(data: T, format?: "json" | "yaml", file?: string): Promise<string | T> {
  let result: string | T = data;
  if (format === "json") result = JSON.stringify(data);
  if (format === "yaml") result = YAML.stringify(data);
  if (file !== undefined) {
    const prettierFileInfo = await prettier.getFileInfo(file);
    const config = await prettier.resolveConfig(file);
    result = prettier.format(result as string, { ...config, parser: prettierFileInfo.inferredParser as any });
    await outputFile(file, result);
  }
  return result;
}

export async function writeMigration(dir: string, up: object, down: object): Promise<any> {
  return Promise.all([formatAndWriteData(up, "yaml", join(dir, "up.yaml")), formatAndWriteData(down, "yaml", join(dir, "down.yaml"))]);
}

export function getTableName(table: string, schema?: string): string {
  return schema && schema !== "public" ? camelize(`${camelize(schema)}${camelize(table)}`) : camelize(table);
}

/**
 * Returns single object name used by Hasura for given PostgreSQL table.
 *
 * @param table is the table name to create single result name.
 * @returns single object name.
 */
export function getSingleObjectName(table: string, schema?: string): string {
  return camelize(singularize(getTableName(table, schema)), true);
}

/**
 * Returns multiple object name used by Hasura for given PostgreSQL table.
 *
 * @param table is the table name to create single result name.
 * @returns single object name.
 */
export function getMultipleObjectName(table: string, schema?: string): string {
  return camelize(pluralize(getTableName(table, schema)), true);
}

export function getHasuraCacheRedirectMapSource(map: Record<string, string>): string {
  return `
  import { CacheResolver } from "apollo-cache-inmemory";

  /**
   * Returns Apollo InMemoryCache redirect configuration for Hasura \`xyz_by_pk\` types.
   *
   * @param trackedTables are list of tracked tables.
   * @returns cache redirection configuration for hasura tracked tables.
   *
   * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects
   * @see https://www.apollographql.com/docs/react/performance/performance/
   *
   * @example
   * import apolloCacheRedirects from "./apollo-cache-redirects";
   *
   * const cache: InMemoryCache = new InMemoryCache({
   *   // \`cache_redirects\` improves performance by mapping queries to previous results of different queries. See:
   *   cacheRedirects: {
   *   Query: { ...apolloCacheRedirects }
   * }
   * });
   */
  function getHasuraCacheRedirects(redirectMap: Record<string, string>): Record<string, CacheResolver> {
    const result: Record<string, CacheResolver> = {};
    Object.entries(redirectMap).forEach(([singleRecordName, tableName]) => {
      result[singleRecordName] = (_, args, { getCacheKey }) => getCacheKey({ __typename: tableName, id: args.id });
    });
    return result;
  }

  /**
   * Object to be used with \`InMemoryCache.cacheRedirects\` to avoid same object with different name from Hasura.
   *
   * @example
   * {
   *   product: (_, args, { getCacheKey }) => getCacheKey({ __typename: "Product", id: args.id }),
   *   member: (_, args, { getCacheKey }) => getCacheKey({ __typename: "Member", id: args.id }),
   * }
   */
  export default getHasuraCacheRedirects(${JSON.stringify(map)});
`;
}

export function getColumnNames(table: Table, exclude: string[]): string[] {
  return table.columns
    .filter(column => !exclude.includes(`${table.name}.${column.name}`) && !exclude.includes(column.name))
    .map(column => column.name);
}
