import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import ErrorBox from "../../components/inquiry/ErrorBox";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";
import { sendInquiry } from "../../helpers/inquiry-helpers";
import styles from "../../styles/Inquiry.module.css";

const Inquiry: NextPage = () => {
  const router = useRouter();

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const errorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorsRef.current) {
      errorsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();
    const firstName = firstNameRef.current!.value.trim();
    const lastName = lastNameRef.current!.value.trim();
    const email = emailRef.current!.value.trim();
    const phone = phoneRef.current!.value.trim();
    const body = bodyRef.current!.value.trim();

    if (firstName && lastName && email && phone && body) {
      sendInquiry({
        firstName,
        lastName,
        email,
        phone,
        body,
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
    } else {
      const newErrors: string[] = [];
      if (!firstName) newErrors.push("名");
      if (!lastName) newErrors.push("姓");
      if (!email) newErrors.push("メール");
      if (!phone) newErrors.push("電話番号");
      if (!body) newErrors.push("お問い合わせ内容");
      setFormErrors(newErrors);
    }
  };

  return (
    <>
      <Card>
        <h1>お問い合わせ</h1>
        <h3>発注のご相談、お気軽にどうぞ</h3>
      </Card>
      <Card>
        {formErrors.length ? (
          <ErrorBox errors={formErrors} ref={errorsRef} />
        ) : null}
        <form onSubmit={handleSubmit}>
          <FormInput
            config={{ name: "last-name", label: "姓", type: "text" }}
            ref={lastNameRef}
          />
          <FormInput
            config={{ name: "first-name", label: "名", type: "text" }}
            ref={firstNameRef}
          />
          <FormInput
            config={{
              name: "email",
              label: "メール",
              placeholder: "example@example.com",
              type: "text",
            }}
            ref={emailRef}
          />
          <FormInput
            config={{
              name: "phone",
              label: "電話番号",
              placeholder: "000-0000-0000",
              type: "tel",
            }}
            ref={phoneRef}
          />
          <div className={styles["form-group"]}>
            <label htmlFor="body">お問い合わせ内容</label>
            <textarea name="body" ref={bodyRef} />
          </div>
          <FormSubmit />
        </form>
      </Card>
    </>
  );
};

export default Inquiry;
