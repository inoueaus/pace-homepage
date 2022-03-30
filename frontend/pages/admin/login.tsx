import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useRef } from "react";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";

const Login: NextPage = () => {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const username = usernameRef.current!.value.trim();
    const password = passwordRef.current!.value.trim();
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
