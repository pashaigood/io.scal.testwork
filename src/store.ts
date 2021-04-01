import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import githubUsersReducer from "./features/github-users/githubUsersSlice";

export const store = configureStore({
  reducer: {
    githubUsers: githubUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
