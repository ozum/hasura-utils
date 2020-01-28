import { camelize } from "inflection";
import { NameFunction } from "../index";

export default function trackTable(
  table: string,
  schema: string,
  options: {
    getSingleObjectName: NameFunction;
    getMultipleObjectName: NameFunction;
    getTableName: NameFunction;
  }
) {
  return {
    type: "track_table",
    version: 2,
    args: {
      table: { schema, name: table },
      configuration: {
        custom_root_fields: {
          select: options.getMultipleObjectName(table, schema),
          select_by_pk: options.getSingleObjectName(table, schema),
          select_aggregate: `${camelize(options.getTableName(table, schema), true)}Aggregate`,
          insert: `add${camelize(options.getMultipleObjectName(table, schema))}`,
          update: `update${camelize(options.getMultipleObjectName(table, schema))}`,
          delete: `delete${camelize(options.getMultipleObjectName(table, schema))}`,
        },
      },
    },
  };
}
