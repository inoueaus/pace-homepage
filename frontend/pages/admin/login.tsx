import type { NextPage } from "next";
import { useRouter } from "next/router";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";

const Login: NextPage = () => {
  const router = useRouter();

  return (
    <Card>
      <form>
        <FormInput
          config={{ label: "ユーザー名", name: "username", type: "text" }}
        />
        <FormInput
          config={{ label: "パスワード", name: "password", type: "password" }}
        />
        <FormSubmit />
      </form>
    </Card>
  );
};

export default Login;
