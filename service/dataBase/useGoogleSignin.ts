import { User } from "@/models/User";
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
      throw Error("error Reducers: useFilter: filterReducer");
    } 
}
