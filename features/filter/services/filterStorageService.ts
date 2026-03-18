import { initialFilter } from "@/hooks/reducers/useFilter";
import { getActionFilterAsync, getFilterAsync } from "@/services/storage/filterStorage";
import { Filter } from "@/models";

export async function getFilters(): Promise<Filter> {
  const filter = await getFilterAsync();
  return filter ?? initialFilter.filter;
}

export async function getAction(): Promise<number> {
  return await getActionFilterAsync();
}