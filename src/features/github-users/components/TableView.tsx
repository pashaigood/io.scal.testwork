import React from "react";
import {
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { Sorting } from "../../../types";
import { User } from "../types";
import TableSortingHead from "./TableSortingHead";
import TableSortingCell from "./TableSortingCell";

interface UsersListProps {
  items: User[];
  sorting: Sorting;
  onSort: (name: string) => void;
}

function TableView(props: UsersListProps) {
  const { items, sorting, onSort } = props;

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableSortingHead sorting={sorting} onSort={onSort}>
          <TableRow>
            <TableCell width={40} />
            <TableSortingCell name={"login"}>Login</TableSortingCell>
            <TableSortingCell name={"type"} width={128}>
              Type
            </TableSortingCell>
          </TableRow>
        </TableSortingHead>
        <TableBody>
          {items.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                <Avatar src={user.avatarUrl} />
              </TableCell>
              <TableCell>{user.login}</TableCell>
              <TableCell>{user.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default React.memo(TableView);
