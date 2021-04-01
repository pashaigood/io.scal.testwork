import { useMemo } from "react";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

export function useActions<T extends { [key: string]: any }>(
  actions: T,
  deps?: any[]
): T {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      return bindActionCreators(actions, dispatch);
    },
    // eslint-disable-next-line
    deps ? [dispatch, ...deps] : [dispatch]
  );
}
