import AsyncStorage from "@react-native-async-storage/async-storage";
import { DestinationType } from "context/destination";
import { SettingsType } from "context/settings";

/* Pressable */
export const pressedDefault = (pressed: boolean) => {
  return {
    opacity: pressed ? 0.25 : 1,
  };
};

/* Async Storage */

export type StoredItem = {
  uid: string;
  title: string;
  subTitle?: string;
  category?: string;
  destination?: string;
};

export const storeData = async (
  item: string,
  value: string | boolean | string[] | DestinationType | SettingsType | StoredItem[]
) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(item, json);
  } catch (error) {
    console.log(error);
  }
};

export const getData = async (item: string) => {
  try {
    const json = await AsyncStorage.getItem(item);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.log(error);
  }
};

export const removeData = async (item: string) => {
  try {
    await AsyncStorage.removeItem(item);
  } catch (error) {
    console.log(error);
  }
};
