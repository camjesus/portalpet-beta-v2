import { ACTION } from "@/hooks/reducers/useFilter";
import { AgeType, Filter } from "@/models";
import { AGE_VALIDATION } from "@/constants/Validations";
import { updateAsync } from "../storage/filterStorage";

type Dispatch = React.Dispatch<any>;
type ActionType = typeof ACTION[keyof typeof ACTION];

export const filterActions = {
  changeFilter(dispatch: Dispatch, field: string, value: any) {
    this._dispatch(dispatch, ACTION.CHANGE_FILTER, field, value);
  },

  changeFrom(dispatch: Dispatch, field: string, value: any) {
    this._dispatch(dispatch, ACTION.CHANGE_FROM, field, value);
  },

  changeUntil(dispatch: Dispatch, field: string, value: any) {
    this._dispatch(dispatch, ACTION.CHANGE_UNTIL, field, value);
  },

    changeLocation(dispatch: Dispatch, lat: number, lng: number) {
    dispatch({
      type: ACTION.CHANGE_LOCATION,
      payload: { field: "location", value: { lat, lng } },
    });
  },
  

  _dispatch(dispatch: Dispatch, type: ActionType, field: string, value: any) {
    dispatch({ type, payload: { field, value } });
  },


  validateFilter(filter: Filter) {
    if (
      (filter.from.ageType === AgeType.YEAR &&
        filter.until.ageType === AgeType.YEAR) ||
      (filter.from.ageType === AgeType.MONTH &&
        filter.until.ageType === AgeType.MONTH)
    ) {
      if (filter.from.age > filter.until.age) {
        return AGE_VALIDATION;
      }
    }
    if (
      filter.from.ageType === AgeType.YEAR &&
      filter.until.ageType === AgeType.MONTH
    ) {
      return AGE_VALIDATION;
    }
    if (!filter.from.age || !filter.until.age) {
      return AGE_VALIDATION;
    }
  },

  async saveAsync(filter: Filter) {
    await updateAsync(JSON.stringify(filter));
  },
};