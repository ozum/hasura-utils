export default function createPermission(
  table: string,
  schema = "public",
  {
    operation,
    role,
    allowAggregations = false,
    columns = [],
    computedFields = [],
    filter = { organization_id: { _eq: "X-Hasura-Organization-Id" } },
    limit = 10000,
  }: {
    operation: "insert" | "select" | "update" | "delete";
    role: string;
    allowAggregations?: boolean;
    columns?: string[];
    computedFields?: string[];
    filter?: object;
    limit?: number;
  }
): object {
  return {
    type: `create_${operation}_permission`,
    role,
    table: { name: table, schema },
    args: { permission: { allow_aggregations: allowAggregations, columns, computed_fields: computedFields, filter, limit } },
  };
}
