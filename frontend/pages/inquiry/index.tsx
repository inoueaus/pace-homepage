import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useRef, useState } from "react";
import Card from "../../components/UI/Card";
import styles from "../../styles/Inquiry.module.css";

const Inquiry: NextPage = () => {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const firstName = firstNameRef.current!.value;
    const lastName = lastNameRef.current!.value;
    const email = emailRef.current!.value;
    const phone = phoneRef.current!.value;
    const body = bodyRef.current!.value;

    if (firstName && lastName && email && phone && body) {
      const jsonBody = JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        body,
      });
      console.log(jsonBody);
      fetch(`${process.env.NEXT_PUBLIC_API_URI}/inquiries/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonBody,
      })
        .then(result => {
          if (!result.ok) throw Error(`Request Failed: ${result.status}`);
          return result.json();
        })
        .then(data => {
          if (data.created && data.id) {
            router.push({
              pathname: "/inquiry/sent",
              query: { inquiryId: data.id },
            });
          }
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <>
      <Card>
        <h1>お問い合わせ</h1>
        <h2>発注のご相談、お気軽にどうぞ</h2>
      </Card>
      <Card>
        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="last-name">姓</label>
            <input name="last-name" type="text" ref={firstNameRef} />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="first-name">名</label>
            <input name="first-name" type="text" ref={lastNameRef} />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="email">メール</label>
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              ref={emailRef}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="phone">電話番号</label>
            <input
              name="phone"
              type="tel"
              placeholder="000-0000-0000"
              ref={phoneRef}
            />
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="body">お問い合わせ内容</label>
            <textarea name="body" ref={bodyRef} />
          </div>
          <button className={styles.submit} type="submit">
            送信
          </button>
        </form>
      </Card>
    </>
  );
};

export default Inquiry;
