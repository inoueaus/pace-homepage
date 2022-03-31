import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "../../components/UI/Card";
import FormInput from "../../components/UI/input/FormInput";
import FormSubmit from "../../components/UI/input/FormSubmit";
import FormTextArea from "../../components/UI/input/FormTextArea";
import Observer from "../../components/UI/Observer";
import { AuthContext } from "../../context/auth-context";
import styles from "../../styles/Admin.module.css";

const fetchInquiries = (page: number, limit: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/inquiries?limit=${limit}&page=${page}`,
    {
      credentials: "include",
    }
  ).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

const convertToB64 = (filesList: FileList) =>
  new Promise((resolve, reject) => {
    const file = filesList[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });

const sendPost = (data: { title: string; body: string; picture?: string }) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/posts/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

const Admin: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [inquiryPage, setInquiryPage] = useState(0);
  const [inquiryEndInView, setInquiryEndInView] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inquiryEndInView && inquiries.length && !fetchComplete) {
      setInquiryPage(prev => prev + 1);
    }
  }, [inquiryEndInView]);

  useEffect(() => {
    {
      fetchInquiries(inquiryPage, 5)
        .then(data => {
          if (!data.length) {
            setFetchComplete(true);
          }
          setInquiries(prev => [...prev, ...data]);
        })
        .catch(error => setInquiryError(error));
    }
  }, [inquiryPage]);

  const handleInquiryClick = (id: number) =>
    router.push(`/admin/inquiry/${id}`);

  const handlePostSubmit: FormEventHandler = event => {
    event.preventDefault();
    const title = titleRef.current!.value.trim();
    const body = bodyRef.current!.value.trim();
    const picture = pictureRef.current!.files;

    if (title && body) {
      if (picture) {
        convertToB64(picture).then(b64Pic => {
          console.log(b64Pic);
          if (typeof b64Pic !== "string") throw TypeError("Pic not String");
          const data = { title, body, picture: b64Pic };
          return sendPost(data)
            .then(data => router.push(`/blog/${data.id}`))
            .catch(error => console.log(error));
        });
      } else {
        const data = { title, body };
        sendPost(data)
          .then(data => router.push(`/blog/${data.id}`))
          .catch(error => console.log(error));
      }
    }
  };

  return (
    <>
      <h1 className={styles.title}>管理画面</h1>
      <div className={styles.row}>
        <Card className="flex">
          <h4>お問合せ一覧</h4>
          <ul className={styles["inquiries-list"]}>
            {inquiries.map(inquiry => (
              <li
                onClick={handleInquiryClick.bind(null, inquiry.id)}
                key={inquiry.id}
              >
                <section style={{ flex: "10%" }}>{inquiry.id}</section>
                <section className={styles.column} style={{ flex: "90%" }}>
                  <small>
                    {new Date(inquiry.createdAt).toLocaleString("ja")}
                  </small>
                  <section>{inquiry.body}</section>
                </section>
              </li>
            ))}
            <Observer setInView={setInquiryEndInView} />
          </ul>
        </Card>
        <Card className="flex">
          <h4>新規投稿</h4>
          <form onSubmit={handlePostSubmit}>
            <FormInput
              config={{ type: "text", name: "title", label: "題名" }}
              ref={titleRef}
            />
            <FormTextArea
              config={{ name: "body", label: "内容" }}
              ref={bodyRef}
            />
            <input type="file" accept="image/png" ref={pictureRef} />
            <FormSubmit />
          </form>
        </Card>
      </div>
    </>
  );
};

export default Admin;
