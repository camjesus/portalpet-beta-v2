import { User } from "@/models";
import { saveUserAsync } from "../storeData/useUser";

export const getGoogleUserInfo = async (token: string | undefined) => {
  try {
    if (!token) return null;
    const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      console.log(JSON.stringify(user))
            console.log(JSON.stringify(token))

      const loginUser: User = {
        id: user.id,
        name: user.given_name,
        lastname: user.family_name,
        email: user.email,
        image: user.picture,
        
      };
      await saveUserAsync(loginUser);
      return loginUser;
    } catch (error) {
      throw Error("error Reducers: useGoogleSigin: getGoogleUserInfo");
    } 
}


export const setDefaultUser = async () => {
  try {
     const defaultUser : User = {
       id: "109667408809638371269",
       name: "Camila",
       lastname: "jesus",
       email: "camilajesus.hh@gmail.com",
       image: ""
     }

      await saveUserAsync(defaultUser);
      return defaultUser;
    } catch (error) {
      throw Error("error Reducers: uuseGoogleSiginse: setDefaultUser");
    } 
}

export const setDefaultUser2 = async () => {
  try {
     const defaultUser : User = {
       id: "4dede6e5-504c-4f46-8339-9d6280a693b0",
       name: "Martin",
       lastname: "Palermo",
       email: "martinpalermo@gmail.com",
       image: ""
     }

      await saveUserAsync(defaultUser);
      return defaultUser;
    } catch (error) {
      throw Error("error Reducers: uuseGoogleSiginse: setDefaultUser");
    } 
}
