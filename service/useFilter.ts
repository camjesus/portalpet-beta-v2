import { initalFilter} from "@/hooks/useFilterReducer";
import { getFilterAsync, saveFilterAsync } from "@/hooks/useFilterStoreData";


//public
export const loadFilter  =  async (stateFilter:string) =>  {
    console.log("entro a loadfilter", stateFilter)

    if(stateFilter !== undefined && stateFilter !== JSON.stringify(initalFilter)){
        console.log("stateFilter dentro", stateFilter)

        await saveFilterAsync(stateFilter);
        return JSON.parse(stateFilter).filter;
    }

    //if(stateFilter === JSON.stringify(initalFilter))
    //{
    //    await saveFilterAsync(stateFilter);
    //}

    await getFilterAsync().then((filter) => {
        console.log("filter", filter)
        return filter && filter;
    })
    console.log("nullllete")

    return null;
}
