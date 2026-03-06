import { Filter, AgeType } from "@/models";
import { AGE_VALIDATION } from "@/constants/Validations";

export const validateFilter = (filter: Filter) => {

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
};