import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useContext, useRef, useState } from "react";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";
import { AuthContext } from "../../context/auth-context";
import { sendLoginReq } from "../../helpers/admin-helpers";

const Login: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const [loginError, setLoginError] = useState<string | null>(null);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();

    if (username && password) {
      sendLoginReq({ username, password })
        .then(data => {
          if (data.authenticated) {
            context.setIsAuth(true);
            router.replace("/admin");
          }
        })
        .catch(error => {
          if (error instanceof Error) {
            setLoginError(error.message);
          }
        });
    }
  };

  return (
    <Card>
      {loginError && <div>{loginError}</div>}
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
