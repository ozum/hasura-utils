export default function _untrackTable(table: string, schema = "public") {
  return {
    type: "untrack_table",
    args: {
      table: { schema, name: table },
    },
  };
}
