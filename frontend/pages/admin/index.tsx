import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";

const Admin: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  console.log(context.isAuth);

  useEffect(() => {
    if (!context.isAuth) router.replace("/admin/login");
  }, [context.isAuth]);

  return <div>Admin Page</div>;
};

export default Admin;
