import { User } from "@/models/User";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserAsync = async (user:User) => {
    try{
        await AsyncStorage.setItem('uid', user.uid);
        await AsyncStorage.setItem('name', user.name);
        await AsyncStorage.setItem('lastname', user.lastname);

        await AsyncStorage.setItem('@user', JSON.stringify(user));
    }catch(error){
        throw Error('error StoreData: useUser: saveUserAsync');
    }
};

export const getUserAsync = async () => {
    try{
        var user = await AsyncStorage.getItem("@user");
        var json = user !== null ? JSON.parse(user): null;
        return json;
    }catch(error){
        throw Error('error StoreData: useUser: getUserAsync');
    }
};