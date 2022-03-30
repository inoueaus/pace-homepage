import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const RouteGuard: React.FC = props => {
  const router = useRouter();
  const context = useContext(AuthContext);

  // const [showContent, setShowContent] = useState(false);

  // useEffect(() => {
  //   router.events.on("routeChangeStart", () => setShowContent(false));
  //   router.events.on("routeChangeComplete", () => setShowContent(true));
  // }, []);

  useEffect(() => {
    const splitPath = router.pathname.split("/");
    if (splitPath[2] === "login") return; // do not redirect if login
    if (splitPath[1] === "admin" && !context.isAuth) {
      router.replace("/admin/login"); // redirect to login page
    }
  }, [router, context]);

  return <>{props.children}</>;
};

export default RouteGuard;
