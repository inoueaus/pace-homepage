import { createContext } from "react";

export interface AuthContextModel {
  isAuth: boolean;
  setUserAsLoggedIn: () => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  setUserAsLoggedIn: () => {},
  logoutUser: () => {},
});
