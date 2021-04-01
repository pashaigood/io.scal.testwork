import _orderBy from "lodash/orderBy";
import _toPairs from "lodash/toPairs";
import _unzip from "lodash/unzip";
import { SortDirection, Sorting } from "../types";

export function order<T>(collection: T[], filter: Sorting): T[] {
  const [fields, direction] = _unzip(_toPairs(filter));
  const iterators = fields.map((field) => (o: { [key: string]: any }) =>
    typeof o[field] === "string" ? o[field].toLowerCase() : o[field]
  );

  return _orderBy(collection, iterators, direction as SortDirection[]);
}
