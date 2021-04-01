import React from "react";
import { TableHead } from "@material-ui/core";
import { TableHeadProps } from "@material-ui/core/TableHead";
import { Sorting } from "../../../types";

interface Context {
  sorting: Sorting;
  onSort: (field: string) => void;
}

export const HeaderContext = React.createContext<Context>({
  sorting: {},
  onSort() {},
});

interface TableSortingHeadProps extends TableHeadProps {
  sorting: Sorting;
  onSort: (field: string) => void;
}

function TableSortingHead(props: TableSortingHeadProps) {
  const { sorting, onSort, ...restProps } = props;
  return (
    <HeaderContext.Provider
      value={{
        sorting,
        onSort,
      }}
    >
      <TableHead {...restProps} />
    </HeaderContext.Provider>
  );
}

export default React.memo(TableSortingHead);
