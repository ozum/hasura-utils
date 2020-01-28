import omitBy from "lodash.omitby";

export default function createInsertPermission(
  table: string,
  schema = "public",
  {
    role,
    columns = [],
    filter,
    set = { organizationId: "X-Hasura-Organization-Id" },
  }: {
    role: string;
    columns?: string[];
    filter?: object;
    set?: object;
  }
): object {
  return {
    type: "create_insert_permission",
    args: {
      role,
      table: { name: table, schema },
      permission: omitBy({ check: filter, set, columns }, (val: any) => val === undefined),
    },
  };
}
