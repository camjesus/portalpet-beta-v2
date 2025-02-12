import { initalFilter } from "@/hooks/reducers/useFilter";
import { getActionFilterAsync, getFilterAsync } from "@/service/storeData/useFilter";
import { Filter } from "@/models/Filter";


export async function  getFilters() : Promise<Filter> {
    await getActionFilterAsync();
     return await getFilterAsync().then((filter) => {
        return filter === null ? initalFilter.filter : filter;
    });
}

export async function  getAction() : Promise<number> {
    return await getActionFilterAsync();
}