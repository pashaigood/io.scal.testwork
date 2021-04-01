import reducer, {
  GithubUsersState,
  githubUsersSlice,
  selectItems,
} from "./githubUsersSlice";
import { User } from "./types";
import { Sorting } from "../../types";
import { RootState } from "../../store";

describe(__filename, () => {
  let initialState: GithubUsersState;
  beforeEach(() => {
    initialState = reducer(undefined, { type: "" });
  });

  it("should load items", () => {
    let state = {
      ...initialState,
      sorting: { login: "asc" } as Sorting,
      loading: true,
    };
    const payload = {
      "0": createUser({ id: "0", login: "Antony" }),
      "1": createUser({ id: "1", login: "Zorg" }),
      "2": createUser({ id: "2", login: "Candy" }),
    };
    state = reducer(state, githubUsersSlice.actions.load(payload));
    expect(state.loading).toBeFalsy();
    expect(state.items).toEqual(payload);
    expect(state.list).toHaveLength(3);
    expect(state.pagination).toEqual({
      page: initialState.pagination.page,
      size: initialState.pagination.size,
      total: 3,
    });
  });

  it("should sort items", () => {
    let state;
    state = {
      ...initialState,
      items: {
        "0": createUser({ id: "0", login: "Antony" }),
        "1": createUser({ id: "1", login: "Zorg" }),
        "2": createUser({ id: "2", login: "Candy" }),
      },
    };
    state = reducer(state, githubUsersSlice.actions.sort());
    expect(state.list).toEqual(["0", "2", "1"]);
    state = reducer(
      state,
      githubUsersSlice.actions.sort({
        login: "desc",
      })
    );
    expect(state.list).toEqual(["1", "2", "0"]);
  });

  it("should toggle sorting", () => {
    let state = {
      ...initialState,
      sorting: {} as Sorting,
    };

    state = reducer(state, githubUsersSlice.actions.toggleSort("login"));
    expect(state.sorting).toEqual({ login: "asc" });

    state = reducer(state, githubUsersSlice.actions.toggleSort("login"));
    expect(state.sorting).toEqual({ login: "desc" });

    state = reducer(state, githubUsersSlice.actions.toggleSort("login"));
    expect(state.sorting).toEqual({ login: "asc" });

    state = reducer(state, githubUsersSlice.actions.toggleSort("type"));
    expect(state.sorting).toEqual({ type: "asc" });
  });

  it("have to brake list on pages", () => {
    let state = {
      ...initialState,
    };
    const payload = {
      "0": createUser({ id: "0", login: "Antony" }),
      "1": createUser({ id: "1", login: "Zorg" }),
      "2": createUser({ id: "2", login: "Candy" }),
      "3": createUser({ id: "3", login: "Nick" }),
    };
    state = reducer(state, githubUsersSlice.actions.load(payload));
    state = reducer(
      state,
      githubUsersSlice.actions.changePagination({ size: 1, page: 0 })
    );

    expect(selectItems(getRootState(state))).toHaveLength(1);

    state = reducer(
      state,
      githubUsersSlice.actions.changePagination({ size: 3, page: 0 })
    );

    expect(selectItems(getRootState(state))).toHaveLength(3);

    state = reducer(
      state,
      githubUsersSlice.actions.changePagination({ page: 1 })
    );

    expect(selectItems(getRootState(state))).toHaveLength(1);
  });
});

function getRootState(state: GithubUsersState): RootState {
  return {
    [githubUsersSlice.name]: state,
  } as RootState;
}

function createUser(data: Partial<User>): User {
  return {
    id: "",
    avatarUrl: "",
    login: "",
    type: "User",
    ...data,
  };
}
