import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface GithubUsersState {
  loading: boolean;
  items: any;
  list: string[];
  pagination: {
    page: number;
    count: number;
  };
}

const initialState: GithubUsersState = {
  loading: false,
  items: {},
  list: [],
  pagination: {
    page: 1,
    count: 0,
  },
};

export const githubUsersSlice = createSlice({
  name: "githubUsers",
  initialState,
  reducers: {
    set(state: GithubUsersState, payload: PayloadAction<any>) {},
    sort() {},
  },
});

export const searchByLogin = (login: string): AppThunk => async (dispatch) => {
  const data = await axios.get(
    `https://api.github.com/search/users?q=${login}`
  );
  console.log(data);
};
