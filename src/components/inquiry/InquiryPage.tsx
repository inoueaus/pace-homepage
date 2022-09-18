import { app } from "@firebase/index";
import { getDatabase, push, ref } from "firebase/database";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import ErrorBox from "../../components/inquiry/ErrorBox";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";
import FormTextArea from "../../components/UI/input/FormTextArea";

const db = getDatabase(app);
const inquriesRef = ref(db, "/inquiries");

const InquiryPage: React.FC<{ path: string }> = ({ path }) => {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [sending, setSending] = useState(false);

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
      setSending(true);
      push(inquriesRef, {
        firstName,
        lastName,
        email,
        phone,
        body,
        createdAt: Date.now(),
        viewed: false,
      })
        .then(result => {
          const newUrl = new URL(window.location.href);
          newUrl.pathname = "/inquiry/sent";
          newUrl.searchParams.set("inquiry-id", String(result.key));
          window.location.href = newUrl.toString();
        })
        .catch(error => {
          setSending(false);
          console.error(error);
        });
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
          <FormTextArea
            config={{ name: "body", label: "お問い合わせ内容" }}
            ref={bodyRef}
          />
          <FormSubmit />
        </form>
      </Card>
    </>
  );
};

export default InquiryPage;
