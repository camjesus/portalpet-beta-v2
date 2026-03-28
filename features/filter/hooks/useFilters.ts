import { useReducer } from "react";
import { filterReducer, initialFilter } from "@/hooks/reducers/useFilter";
import { filterActions } from "@/services/filter/filterActions";
import { Validation } from "@/models";

export function useFilters(stateFilter?: string) {
  const [state, dispatch] = useReducer(
    filterReducer,
    stateFilter ? JSON.parse(stateFilter) : initialFilter,
  );

  function changeValue(value: any, field: string) {
    filterActions.changeFilter(dispatch, field, value);
  }

  function changeFrom(value: any, field: string) {
    filterActions.changeFrom(dispatch, field, value);
  }

  function changeUntil(value: any, field: string) {
    filterActions.changeUntil(dispatch, field, value);
  }

  async function saveAsync(): Promise<{ error?: Validation }> {
    const error = filterActions.validateFilter(state.filter);
    if (error) return { error };
    await filterActions.saveAsync(state.filter);
    return {};
  }

  return { state, changeValue, changeFrom, changeUntil, saveAsync };
}