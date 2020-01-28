import omitBy from "lodash.omitby";

export default function createUpdatePermission(
  table: string,
  schema = "public",
  {
    role,
    columns = [],
    filter = { organizationId: { _eq: "X-Hasura-Organization-Id" } },
    set,
  }: {
    role: string;
    columns?: string[];
    filter?: object;
    set?: object;
  }
): object {
  return {
    type: "create_update_permission",
    args: {
      role,
      table: { name: table, schema },
      permission: omitBy({ columns, filter, set }, (val: any) => val === undefined),
    },
  };
}
