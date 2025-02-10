import { Filter } from "@/models/Filter";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFilterAsync = async()=> 
    {
        try{
            var filter = await AsyncStorage.getItem('@filter');
            console.log("filter get ", filter);
            if(filter !== null)
                {
                    let localFilter = JSON.parse(filter);
                    console.log("localFilter ", filter);
            
                    console.log("localFilter ", localFilter);
                    console.log("localFilter sex", localFilter.sex);
                      return localFilter;
                }
        }catch(err)
        {
            console.log("err ", err);
        }
        return null;
    };
    
    export const saveFilterAsync = async(filter:string)=> 
    {
        console.log("filter a savee", filter);
        try{
            await AsyncStorage.removeItem('@filter');
            await AsyncStorage.setItem('@filter', filter);
        }catch(error){
            throw Error('error en saveFilter');
        }
    };

    export const cleanAllAsync = async() => {
        console.log("limpiete")
    
        //await AsyncStorage.clear();
        try{
            var userss = await AsyncStorage.getAllKeys();
            console.log("userss",  userss)
            var users = await AsyncStorage.getItem('@filter');
            console.log("limpiete",  users != null ? JSON.parse(users) : null)
        }catch(err){
            console.log("error")
        }

    }

    