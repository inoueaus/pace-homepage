import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";

const Login: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  useEffect(() => {
    context.isAuth && router.replace("/");
  }, [context.isAuth]);
  return <div>Login Page</div>;
};

export default Login;
