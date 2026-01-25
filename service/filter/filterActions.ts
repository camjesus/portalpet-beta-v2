import { ACTION } from "@/hooks/reducers/useFilter";
import { AgeType } from "@/models/Enums";
import { Filter } from "@/models/Filter";
import { Error } from "@/models/Error";
import { AGE_VALIDATION } from "@/constants/ErrorMsg";

type Dispatch = React.Dispatch<any>;

//public
export const filterActions = {
  changeFilter(dispatch: Dispatch, field: string, value: any) {
    dispatch({
      type: ACTION.CHANGE_FILTER,
      payload: { field, value },
    });
  },

  changeFrom(dispatch: Dispatch, field: string, value: any, filter: Filter) {
    dispatch({
      type: ACTION.CHANGE_FROM,
      payload: { field, value },
    });
  },

  changeUntil(dispatch: Dispatch, field: string, value: any, filter: Filter) {
    dispatch({
      type: ACTION.CHANGE_UNTIL,
      payload: { field, value },
    });
  },

  validateFilter(filter: Filter) {
    if (
      (filter.from.ageType === AgeType.YEAR &&
        filter.until.ageType === AgeType.YEAR) ||
      (filter.from.ageType === AgeType.MONTH &&
        filter.until.ageType === AgeType.MONTH)
    ) {
      if (filter.from.age > filter.until.age) {
        console.log(AGE_VALIDATION);
        return AGE_VALIDATION;
      }
    }
    if (
      filter.from.ageType === AgeType.YEAR &&
      filter.until.ageType === AgeType.MONTH
    ) {
      return AGE_VALIDATION;
    }
  },
};
