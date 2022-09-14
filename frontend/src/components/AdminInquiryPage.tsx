import { useEffect, useState } from "react";
import styles from "../../styles/Admin.module.css";
import Card from "./UI/Card";
import Observer from "./UI/Observer";
import {
  getDatabase,
  query,
  ref,
  get,
  orderByChild,
  limitToLast,
  endBefore,
  set,
} from "firebase/database";
import { app } from "@firebase/index";
import type { Inquiry } from "@localTypes/admin";

const db = getDatabase(app);
const inquriesRef = ref(db, "/inquiries");

type InquiryWithoutId = Omit<Inquiry, "id">;

const AdminInquiryPage: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [inquiryPage, setInquiryPage] = useState(0);
  const [lastItemTime, setLastItemTime] = useState(0);
  const [inquiryEndInView, setInquiryEndInView] = useState(false);
  const [inquiry, setInquiry] = useState<InquiryWithoutId>();

  useEffect(() => {
    if (inquiryEndInView && inquiries.length && !fetchComplete) {
      setInquiryPage(prev => prev + 1);
    }
  }, [inquiryEndInView]);

  useEffect(() => {
    {
      get(
        query(
          inquriesRef,
          orderByChild("createdAt"),
          endBefore(lastItemTime ? lastItemTime : ""), // using a string gets the last time
          limitToLast(5)
        )
      ).then(snapshot => {
        const data: Record<string, InquiryWithoutId> = snapshot.val();
        if (!data) {
          return setFetchComplete(true);
        }
        const inquiries: Inquiry[] = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
        }));
        const lastItemTime = inquiries[0].createdAt;
        setLastItemTime(lastItemTime);
        setInquiries(prev => [...prev, ...inquiries.reverse()]);
      });
    }
  }, [inquiryPage]);

  const handleInquiryClick = (id: string) => {
    set(ref(db, `/inquiries/${id}/viewed`), true);
    get(ref(db, `/inquiries/${id}`)).then(snapshot => {
      const data: InquiryWithoutId = snapshot.val();
      setInquiry(data);
    });
  };

  return (
    <Card className="wide">
      <h4>お問合せ一覧</h4>
      {inquiry && (
        <Card>
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
            <section
              style={{
                flex: "20%",
                wordBreak: "break-all",
                paddingRight: "1rem",
              }}
            >
              {inquiry.id.replace("-", "")}
            </section>
            <section className={styles.column} style={{ flex: "80%" }}>
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
