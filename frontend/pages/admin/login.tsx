import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useContext, useRef } from "react";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";
import { AuthContext } from "../../context/auth-context";

const Login: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    if (username && password) {
      const data = { username, password };
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/users/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
      })
        .then(result => {
          if (!result.ok)
            throw Error(`Login failed: ${result.status} ${result.statusText}`);
          return result.json();
        })
        .then(data => {
          if (data.authenticated) {
            context.setIsAuth(true);
            router.replace("/admin");
          }
        });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <FormInput
          config={{ label: "ユーザー名", name: "username", type: "text" }}
          ref={usernameRef}
        />
        <FormInput
          config={{ label: "パスワード", name: "password", type: "password" }}
          ref={passwordRef}
        />
        <FormSubmit />
      </form>
    </Card>
  );
};

export default Login;
