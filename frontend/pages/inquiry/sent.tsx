import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Card from "../../components/UI/Card";

const Sent: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.inquiryId) router.replace("/"); // redirect to home page if not after submit
  }, [router.query]);

  useEffect(() => {
    const timeout = setTimeout(() => router.push("/"), 10000); // redirect to home page in 10 secs
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Card>
      <h1>お問い合わせありがとうございます。</h1>
      <h3>
        お問合せを受け付けました。 <br />
        整理番号は{router.query.inquiryId}。
      </h3>
    </Card>
  );
};

export default Sent;
