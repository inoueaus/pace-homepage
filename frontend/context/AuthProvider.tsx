import React, { useState } from "react";
import { AuthContext, AuthContextModel } from "./auth-context";

const AuthProvider: React.FC = props => {
  const [isAuth, setIsAuth] = useState(false);

  const defaultValue: AuthContextModel = {
    isAuth,
    setIsAuth,
  };

  return <AuthContext.Provider value={defaultValue}></AuthContext.Provider>;
};
