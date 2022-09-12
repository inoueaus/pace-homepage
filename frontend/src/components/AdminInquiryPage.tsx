import { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css";
import Card from "./UI/Card";
import Observer from "./UI/Observer";

const AdminInquiryPage: React.FC<{ path: string }> = ({ path }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [inquiryPage, setInquiryPage] = useState(0);
  const [inquiryEndInView, setInquiryEndInView] = useState(false);
  const [inquiry, setInquiry] = useState<Inquiry>();

  useEffect(() => {
    if (inquiryEndInView && inquiries.length && !fetchComplete) {
      setInquiryPage(prev => prev + 1);
    }
  }, [inquiryEndInView]);

  useEffect(() => {
    {
      fetch(`${path}/inquiries?limit=${5}&page=${inquiryPage}`, {
        credentials: "include",
      })
        .then(result => {
          if (!result.ok)
            throw Error(
              `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
            );
          return result.json();
        })
        .then(data => {
          if (!data.length) {
            setFetchComplete(true);
          }
          setInquiries(prev => [...prev, ...data]);
        });
    }
  }, [inquiryPage]);

  const handleInquiryClick = (id: number) => {
    fetch(`${path}/inquiries/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ viewed: true }),
    });
    fetch(`${path}/inquiries/${id}`, {
      credentials: "include",
    })
      .then(result => result.json())
      .then((data: Inquiry) => setInquiry(data));
  };

  return (
    <Card className="wide">
      <h4>お問合せ一覧</h4>
      {inquiry && (
        <Card>
          <h4>整理番号: {inquiry.id}</h4>
          <table>
            <tbody>
              <tr>
                <td>氏名:</td>
                <td>{`${inquiry.lastName} ${inquiry.firstName}`}</td>
              </tr>
              <tr>
                <td>お問合せ日時:</td>
                <td>{new Date(inquiry.createdAt).toLocaleDateString("ja")}</td>
              </tr>
              <tr>
                <td>電話番号:</td>
                <td>{inquiry.phone}</td>
              </tr>
              <tr>
                <td>メール:</td>
                <td>{inquiry.email}</td>
              </tr>
              <tr>
                <td>お問合せ内容</td>
                <td>{inquiry.body}</td>
              </tr>
            </tbody>
          </table>
        </Card>
      )}
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

export default AdminInquiryPage;
