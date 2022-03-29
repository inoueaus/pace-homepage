import React, { useEffect, useState } from "react";
import { AuthContext, AuthContextModel } from "./auth-context";

const AuthProvider: React.FC = props => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      document.cookie.split(";").some(cookie => cookie.includes("token"))
    );
  }, []);

  console.log(process.env.NEXT_PUBLIC_API_URI);

  const logoutUser = () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).finally(() => setIsAuth(false));

  const defaultValue: AuthContextModel = {
    isAuth,
    setIsAuth,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
