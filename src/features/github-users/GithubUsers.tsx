import React, { ChangeEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Box, Paper, TablePagination, Typography } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import {
  selectItems,
  searchByLogin,
  toggleSort,
  changePage,
  changeSizeOnPage,
  selectPagination,
  selectSorting,
  selectError,
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
  const { hasError, error } = useSelector(selectError);

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
      <Box overflow={"hidden"}>
        <TableView
          items={users}
          sorting={sorting}
          onSort={actions.toggleSort}
        />
        {hasError ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          !users.length && (
            <Box p={"10px"}>
              <Typography align={"center"} variant={"h6"}>
                Nothing to display
              </Typography>
            </Box>
          )
        )}
      </Box>
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
