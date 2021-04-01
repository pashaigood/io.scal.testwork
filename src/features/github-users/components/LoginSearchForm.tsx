import React, {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useState,
} from "react";
import { Button, Grid, Input, InputAdornment } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";

const Container = styled.section`
  padding: 40px 20px;
`;

interface SearchFormProps extends React.HTMLAttributes<HTMLElement> {
  onSearch: (login: string) => void;
}

function LoginSearchForm(props: SearchFormProps) {
  const { onSearch } = props;
  const [value, setValue] = useState("");
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);
  const handleSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      onSearch(value);
    },
    [value, onSearch]
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Input
              fullWidth
              placeholder={"type a github user nick"}
              value={value}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default React.memo(LoginSearchForm);
