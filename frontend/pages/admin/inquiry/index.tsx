import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Card from "../../../components/UI/Card";
import Observer from "../../../components/UI/Observer";
import { AuthContext } from "../../../context/auth-context";
import { fetchInquiries } from "../../../helpers/admin-helpers";
import styles from "../../../styles/Admin.module.css";

const AdminInquiry: NextPage = () => {
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
        .catch(error => {
          setInquiryError(error);
          context.setIsAuth(false);
        });
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
    <Card className="wide">
      <h4>お問合せ一覧</h4>
      <ul className={styles["inquiries-list"]}>
        {inquiries.map(inquiry => (
          <li
            onClick={handleInquiryClick.bind(null, inquiry.id)}
            key={inquiry.id}
            className={`${!inquiry.viewed && styles.new}`}
          >
            <section style={{ flex: "10%" }}>{inquiry.id}</section>
            <section className={styles.column} style={{ flex: "90%" }}>
              <small>{new Date(inquiry.createdAt).toLocaleString("ja")}</small>
              <section>{inquiry.body}</section>
            </section>
          </li>
        ))}
        <Observer setInView={setInquiryEndInView} />
      </ul>
    </Card>
  );
};

export default AdminInquiry;
