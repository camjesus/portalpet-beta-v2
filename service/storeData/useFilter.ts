import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFilterAsync = async()=> 
{
    try{
        var filter = await AsyncStorage.getItem('@filter');

        if(filter !== null)
            return JSON.parse(filter);
    }catch(error){
        throw Error("error StoreData: UseFilter: getFilterAsync" + error);
    }
    return null;
};

export const saveFilterAsync = async(filter:string)=> 
{
    try{
        await AsyncStorage.removeItem('@filter');
        await AsyncStorage.setItem('@filter', filter);
    }catch(error){
        throw Error("error StoreData: UseFilter: saveFilterAsync" + error);
    }
};

export const saveActionFilterAsync = async(action:number)=> 
{
    try{
        await AsyncStorage.removeItem('action');
        await AsyncStorage.setItem('action', action.toString());
    }catch(error){
        throw Error("error StoreData: UseFilter: saveActionFilterAsync" + error);
    }
};

export const getActionFilterAsync = async()=> 
{
    try{
        var action = await AsyncStorage.getItem('action');
        return action !== null ? parseInt(action) : 0;
    }catch(error){
        throw Error("error StoreData: UseFilter: saveActionFilterAsync" + error);
    }
};

export const cleanAllAsync = async() => {
    console.log("limpiete")
    //await AsyncStorage.clear();
    try{
        var keys = await AsyncStorage.getAllKeys();
        console.log("keys",  keys)
        var filter = await AsyncStorage.getItem('@filter');
        console.log("filter",  filter != null ? JSON.parse(filter) : null)
    }catch(error){
        throw Error("error StoreData: UseFilter: cleanAllAsync" + error);
    }
}