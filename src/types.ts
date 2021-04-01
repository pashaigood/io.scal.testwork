export type Pagination = {
  page: number;
  size: number;
  total: number;
};

export type SortDirection = "asc" | "desc";

export type Sorting = {
  [key: string]: SortDirection;
};
