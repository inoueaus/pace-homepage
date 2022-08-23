import type { NextPage } from "next";
import Link from "next/link";
import Card from "../../components/UI/Card";
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
