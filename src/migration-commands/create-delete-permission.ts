import omitBy from "lodash.omitby";

export default function createDeletePermission(
  table: string,
  schema = "public",
  {
    role,
    filter = { organizationId: { _eq: "X-Hasura-Organization-Id" } },
  }: {
    role: string;
    filter?: object;
  }
): object {
  return {
    type: "create_delete_permission",
    args: {
      role,
      table: { name: table, schema },
      permission: omitBy({ filter }, (val: any) => val === undefined),
    },
  };
}
