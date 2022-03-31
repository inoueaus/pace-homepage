import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../../components/UI/Card";
import styles from "../../../styles/Admin.module.css";

const fetchInquiry = (id: number | string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URI}/inquiries/${id}`, {
    credentials: "include",
  }).then(result => {
    if (!result.ok)
      throw Error(
        `Inquiry Fetch Failed: ${result.status} ${result.statusText}`
      );
    return result.json();
  });

const ViewInquiry: NextPage = () => {
  const router = useRouter();
  console.log(router.query.id);

  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const id = Number(router.query.id);
    if (isNaN(id)) return;
    fetchInquiry(id).then(data => setInquiry(data));
  }, []);

  return (
    <>
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
    </>
  );
};

export default ViewInquiry;
