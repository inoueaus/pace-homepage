import React, { useEffect, useState } from "react";
import { AuthContext, AuthContextModel } from "./auth-context";

const AuthProvider: React.FC<{ children: React.ReactNode }> = props => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      window.localStorage.getItem("authenticated") === "1" ? true : false
    );
  }, []);

  const setUserAsLoggedIn = () => {
    window.localStorage.setItem("authenticated", "1");
    setIsAuth(true);
  };

  const logoutUser = () =>
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    }).finally(() => {
      setIsAuth(false);
      window.localStorage.setItem("authenticated", "0");
    });

  const defaultValue: AuthContextModel = {
    isAuth,
    setUserAsLoggedIn,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={defaultValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
