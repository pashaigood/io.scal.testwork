import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { order } from "../../utils/collection";
import { Pagination, Sorting } from "../../types";
import { AppThunk, RootState } from "../../store";
import { searchUsersByLogin } from "./api/github";
import { User } from "./types";

export interface GithubUsersState {
  loading: boolean;
  error: null | string;
  items: { [key: string]: User };
  list: string[];
  sorting: Sorting;
  pagination: Pagination;
}

const initialState: GithubUsersState = {
  error: null,
  loading: false,
  items: {},
  list: [],
  sorting: { login: "asc" },
  pagination: {
    page: 0,
    size: 10,
    total: 0,
  },
};

export const githubUsersSlice = createSlice({
  name: "githubUsers",
  initialState,
  reducers: {
    set(
      state: GithubUsersState,
      action: PayloadAction<Partial<GithubUsersState>>
    ) {
      return {
        ...state,
        ...action.payload,
      };
    },

    reset(
      state: GithubUsersState,
      action: PayloadAction<Partial<GithubUsersState> | undefined>
    ) {
      return { ...initialState, ...action.payload };
    },

    load(
      state: GithubUsersState,
      action: PayloadAction<{ [key: string]: User }>
    ) {
      state.loading = false;
      state.items = action.payload;
      githubUsersSlice.caseReducers.sort(state);
      state.pagination = {
        ...state.pagination,
        page: initialState.pagination.page,
        total: state.list.length,
      };
    },

    sort(state: GithubUsersState, action?: PayloadAction<Sorting | undefined>) {
      if (action?.payload) {
        state.sorting = {
          ...state.sorting,
          ...action.payload,
        };
      }
      state.list = order(Object.values(state.items), state.sorting).map(
        (o) => o.id
      );
    },

    toggleSort(state: GithubUsersState, action: PayloadAction<string>) {
      const field = action.payload;
      let sorting = state.sorting;
      if (sorting[field] === undefined || sorting[field] === "desc") {
        sorting = { [field]: "asc" };
      } else if (sorting[field] === "asc") {
        sorting = { [field]: "desc" };
      }

      state.sorting = sorting;
      githubUsersSlice.caseReducers.sort(state);
    },

    changePagination(state, action: PayloadAction<Partial<Pagination>>) {
      state.pagination = {
        ...state.pagination,
        ...action.payload,
      };
    },
  },
});

// export const { } = githubUsersSlice.actions;

export const selfSelector = (state: RootState) => state[githubUsersSlice.name];

export const selectPagination = createSelector(
  selfSelector,
  (state: GithubUsersState): Pagination => state.pagination
);

export const selectSorting = createSelector(
  selfSelector,
  (state: GithubUsersState): Sorting => state.sorting
);

export const selectItems = createSelector(
  selfSelector,
  selectPagination,
  (state: GithubUsersState, pagination: Pagination): User[] => {
    return state.list
      .slice(
        pagination.page * pagination.size,
        pagination.page * pagination.size + pagination.size
      )
      .map((id) => state.items[id]);
  }
);

export const selectError = createSelector(
  selfSelector,
  (state: GithubUsersState) => {
    return { hasError: !!state.error, error: state.error };
  }
);

export const searchByLogin = (login: string): AppThunk => async (dispatch) => {
  if (login.length < 2) {
    dispatch(githubUsersSlice.actions.reset());
    return;
  }
  dispatch(githubUsersSlice.actions.set({ loading: true }));
  try {
    const items = await searchUsersByLogin(login);
    dispatch(githubUsersSlice.actions.load(items));
  } catch (e) {
    dispatch(githubUsersSlice.actions.reset({ error: e.message }));
  }
};

export const toggleSort = (field: string) => {
  return githubUsersSlice.actions.toggleSort(field);
};

export const changePage = (page: number) => {
  return githubUsersSlice.actions.changePagination({
    page: page || initialState.pagination.page,
  });
};

export const changeSizeOnPage = (size: number) => {
  return githubUsersSlice.actions.changePagination({
    size: size || initialState.pagination.size,
  });
};

export default githubUsersSlice.reducer;
