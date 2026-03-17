import { ACTION } from "@/hooks/reducers/useFilter";
import { Filter } from "@/models";
import { saveFilter } from "../services/filterService";

type Dispatch = React.Dispatch<any>;
type ActionType = typeof ACTION[keyof typeof ACTION];

export const changeFilterField = (
  dispatch: Dispatch,
  type: ActionType,
  field: string,
  value: any
) => {
  dispatch({ type, payload: { field, value } });
};

export const saveFilterAsync = async (filter: Filter) => {
  await saveFilter(filter);
};