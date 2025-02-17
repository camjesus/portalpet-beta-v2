import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserAsync = async (user:User) => {
    try{
        await AsyncStorage.setItem('@user', JSON.stringify(user));
    }catch(error){
        throw Error('error StoreData: useUser: saveUserAsync');
    }
};

export const getUserAsync = async () : Promise<User> => {
    try{
        var user = await AsyncStorage.getItem("@user");
        var json = user !== null ? JSON.parse(user): null;

        return json;
    }catch(error){
        throw Error('error StoreData: useUser: getUserAsync');
    }
};

export const updateUserAsync = async (user:User) => {
    try{
        await AsyncStorage.removeItem('@user');
        await AsyncStorage.setItem('@user', JSON.stringify(user));
    }catch(error){
        throw Error('error StoreData: useUser: updateUserAsync');
    }
};