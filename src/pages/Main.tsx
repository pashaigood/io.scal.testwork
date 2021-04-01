import React from "react";
import styled from "styled-components";
import { Typography, Box } from "@material-ui/core";
import GithubUsers from "../features/github-users/GithubUsers";

const Container = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f2f6;
`;

const StyledGithubUsers = styled(GithubUsers)`
  width: 500px;
  height: 70%;
  margin: auto;
`;

export function Main() {
  return (
    <Container>
      <Box marginTop="20px">
        <Typography variant="h2">Awesome github user search</Typography>
      </Box>
      <StyledGithubUsers />
    </Container>
  );
}
