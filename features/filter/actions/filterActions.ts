import { ACTION } from "@/hooks/reducers/useFilter";
import { Filter } from "@/models";
import { saveFilter } from "../services/filterService";

type Dispatch = React.Dispatch<any>;

export const changeFilter = (
  dispatch: Dispatch,
  field: string,
  value: any
) => {
  dispatch({
    type: ACTION.CHANGE_FILTER,
    payload: { field, value },
  });
};

export const changeFrom = (
  dispatch: Dispatch,
  field: string,
  value: any,
  filter: Filter
) => {
  dispatch({
    type: ACTION.CHANGE_FROM,
    payload: { field, value },
  });
};

export const changeUntil = (
  dispatch: Dispatch,
  field: string,
  value: any,
  filter: Filter
) => {
  dispatch({
    type: ACTION.CHANGE_UNTIL,
    payload: { field, value },
  });
};

export const saveFilterAsync = async (filter: Filter) => {
  await saveFilter(filter);
};