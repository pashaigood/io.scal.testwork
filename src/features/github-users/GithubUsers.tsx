import React, { ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Paper, TablePagination } from "@material-ui/core";
import {
  selectItems,
  searchByLogin,
  toggleSort,
  changePage,
  changeSizeOnPage,
  selectPagination,
  selectSorting,
} from "./githubUsersSlice";
import LoginSearchForm from "./components/LoginSearchForm";
import TableView from "./components/TableView";
import { useActions } from "../../effects/useActions";

const Container = styled(Paper)`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

interface GithubUsersProps extends React.HTMLAttributes<HTMLElement> {}

function GithubUsers(props: GithubUsersProps) {
  const actions = useActions({
    searchByLogin,
    toggleSort,
    changePage,
    changeSizeOnPage,
  });
  const users = useSelector(selectItems);
  const pagination = useSelector(selectPagination);
  const sorting = useSelector(selectSorting);

  const handlePageChange = useCallback(
    (e, page: number) => {
      actions.changePage(page);
    },
    [actions]
  );

  const handleChangeRowsPerPage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      actions.changeSizeOnPage(Number(e.target.value));
    },
    [actions]
  );

  return (
    <Container {...props}>
      <LoginSearchForm onSearch={actions.searchByLogin} />
      <TableView items={users} sorting={sorting} onSort={actions.toggleSort} />
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 20, 30]}
        count={pagination.total}
        rowsPerPage={pagination.size}
        page={pagination.page}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Container>
  );
}

export default React.memo(GithubUsers);
