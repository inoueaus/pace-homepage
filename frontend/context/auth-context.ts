import { createContext } from "react";

export interface AuthContextModel {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}

export const AuthContext = createContext<AuthContextModel>({
  isAuth: false,
  setIsAuth: () => {},
});
