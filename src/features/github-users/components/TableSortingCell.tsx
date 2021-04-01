import React, { useCallback, useContext } from "react";
import { TableCell, TableSortLabel } from "@material-ui/core";
import { TableCellProps } from "@material-ui/core/TableCell";
import { HeaderContext } from "./TableSortingHead";

interface TableSortingCellProps extends TableCellProps {
  name: string;
}

function TableSortingCell(props: TableSortingCellProps) {
  const { name, children, ...restProps } = props;
  const { sorting, onSort } = useContext(HeaderContext);

  const isSorted = !!sorting[name];

  const handleClick = useCallback(() => {
    onSort(name);
  }, [name, onSort]);

  return (
    <TableCell {...restProps} onClick={handleClick}>
      <TableSortLabel
        active={isSorted}
        direction={isSorted ? sorting[name] : undefined}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
}

export default React.memo(TableSortingCell);
