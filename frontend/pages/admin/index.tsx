import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FormEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Card from "../../components/UI/Card";
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

const Admin: NextPage = () => {
  const router = useRouter();
  const context = useContext(AuthContext);

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [inquiryError, setInquiryError] = useState<string | null>(null);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [inquiryPage, setInquiryPage] = useState(0);
  const [inquiryEndInView, setInquiryEndInView] = useState(false);

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

  const handleInquiryClick = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URI}/inquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ viewed: true }),
    });
    router.push(`/admin/inquiry/${id}`);
  };

  return (
    <>
      <h1 className={styles.title}>管理画面</h1>

      <Card>
        <Link href="/admin/inquiry">
          <a>お問合せ一覧</a>
        </Link>
      </Card>

      <Card>
        <Link href="/admin/blog">
          <a>新規投稿</a>
        </Link>
      </Card>
    </>
  );
};

export default Admin;
