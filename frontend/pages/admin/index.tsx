import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth-context";

const Admin: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const [inquiries, setInquiries] = useState<{ id: number; body: string }[]>(
    []
  );

  // useEffect(() => {
  //   if (!context.isAuth) router.replace("/admin/login");
  // }, [context.isAuth]);

  useEffect(() => {
    if (context.isAuth) {
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/inquiries`, {
        credentials: "include",
      })
        .then(result => {
          if (!result.ok) throw Error("Not Auth");
          console.log("req");
          return result.json();
        })
        .then(data => setInquiries(data))
        .catch(_ => router.push("/admin/login"));
    }
  }, [context.isAuth]);

  return (
    <div>
      <h1>Admin Page</h1>
      <ul>
        {inquiries.map(inquiry => (
          <li>{inquiry.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
