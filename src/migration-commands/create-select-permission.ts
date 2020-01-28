import omitBy from "lodash.omitby";

export default function createSelectPermission(
  table: string,
  schema = "public",
  {
    role,
    allowAggregations = false,
    columns = [],
    computedFields,
    filter = { organizationId: { _eq: "X-Hasura-Organization-Id" } },
    limit = 10000,
  }: {
    role: string;
    allowAggregations?: boolean;
    columns?: string[];
    computedFields?: string[];
    filter?: object;
    limit?: number;
  }
): object {
  return {
    type: "create_select_permission",
    args: {
      role,
      table: { name: table, schema },
      permission: omitBy(
        { allow_aggregations: allowAggregations, columns, computed_fields: computedFields, filter, limit },
        (val: any) => val === undefined
      ),
    },
  };
}
