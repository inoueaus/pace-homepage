import React, { useEffect, useState } from "react";
import { AuthContext, AuthContextModel } from "./auth-context";

const AuthProvider: React.FC = props => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {});

  const defaultValue: AuthContextModel = {
    isAuth,
    setIsAuth,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
