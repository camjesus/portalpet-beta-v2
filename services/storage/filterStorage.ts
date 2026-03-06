import { Filter } from "@/models";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTION_KEY = "@action";
const FILTER_KEY = "@filter";

export const getFilterAsync = async () => {
  try {
    var filter = await AsyncStorage.getItem("@filter");

    if (filter !== null) return JSON.parse(filter);
  } catch (error) {
    throw Error("error StoreData: UseFilter: getFilterAsync" + error);
  }
  return null;
};

export const updateAsync = async (filter: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FILTER_KEY);
    await AsyncStorage.setItem(FILTER_KEY, filter);
  } catch (error) {
    throw new Error("StoreData:UseFilter:updateAsync failed: " + error);
  }
};

export const saveActionFilterAsync = async (action: number): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ACTION_KEY);
    await AsyncStorage.setItem(ACTION_KEY, action.toString());
  } catch (error) {
    throw new Error(
      "StoreData:UseFilter:saveActionFilterAsync failed: " + error,
    );
  }
};

export const getActionFilterAsync = async (): Promise<number> => {
  try {
    const action = await AsyncStorage.getItem(ACTION_KEY);
    return action !== null ? parseInt(action) : 0;
  } catch (error) {
    throw new Error(
      "StoreData:UseFilter:getActionFilterAsync failed: " + error,
    );
  }
};
