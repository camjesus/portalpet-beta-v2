import { Filter } from "@/models";
import { updateAsync } from "@/services/storage/filterStorage";

export const saveFilter = async (filter: Filter) => {
  await updateAsync(JSON.stringify(filter));
};