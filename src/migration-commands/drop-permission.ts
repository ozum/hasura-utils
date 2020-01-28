import { Operation } from "../index";

export default function dropPermission(
  table: string,
  schema = "public",
  { role, operation }: { role: string; operation: Operation }
): object {
  return {
    type: `drop_${operation}_permission`,
    args: { role, table: { name: table, schema } },
  };
}
