import { Pet, PetId } from "@/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveMyPetsAsync = async(pets:PetId[])=> 
{
    try{
        await AsyncStorage.removeItem('@myPets');
        await AsyncStorage.setItem('@myPets', JSON.stringify(pets));
    }catch(error){
        throw Error("error StoreData: UsePets: saveMyPetsAsync" + error);
    }
};

export const getMyPetsAsync = async()=> 
{
    try{
        var myPets = await AsyncStorage.getItem('@myPets');
        if(myPets !== null)
            return JSON.parse(myPets);
    }catch(error){
        throw Error("error StoreData: UsePets: getMyPetsAsync" + error);
    }
    return null;
};