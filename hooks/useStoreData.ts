import { Filter } from '@/models/Filter';
import { User } from '@/models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { State } from './useFilterReducer';


export const saveUser = async (user:User) => {
    try{
        await AsyncStorage.setItem('uid', user.uid);
        await AsyncStorage.setItem('name', user.name);
        await AsyncStorage.setItem('lastname', user.lastname);

        await AsyncStorage.setItem('@user', JSON.stringify(user));
        //console.log("paso ", user)
    }catch(error){
        throw Error('error en userData');
    }
};

export const getUserAsync = async () => {
    try{
          var users = await AsyncStorage.getItem("@user");
          
          var json = users !== null ? JSON.parse(users): null;
          //console.log("getUserAsync",json);
          return json;
    }catch(error){
        throw Error('error en getUserId');
    }
};

export const savePetsAsync = async (pets:any[]) => {
    //console.log("savePetsAsync",pets);

    try{
        await AsyncStorage.removeItem('@pets');
        await AsyncStorage.setItem('@pets', JSON.stringify(pets));
    }catch(error){
        throw Error('error en savePetsAsync');
    }
};

export const getPets  = async () => {
    var myPets = await AsyncStorage.getItem('@pets');
    return myPets != null ? JSON.parse(myPets) : null;
};

export const getFilterAsync = async()=> 
{
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
    return null;
};

export const saveFilterAsync = async(filter:Filter)=> 
{
    console.log("filter a savee", filter);
    try{
        await AsyncStorage.removeItem('@filter');
        await AsyncStorage.setItem('@filter', JSON.stringify(filter));
    }catch(error){
        throw Error('error en saveFilter');

    }
};

export const cleanAllAsync = async() => {
    await AsyncStorage.clear();
}