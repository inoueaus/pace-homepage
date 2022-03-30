import Link from "next/link";
import React from "react";

import styles from "./InquiryFooter.module.css";

const InquiryFooter: React.FC = () => {
  return (
    <div className={styles["inquiry"]}>
      <h1>お問い合わせ</h1>

      <Link href="/inquiry">
        <a style={{ color: "white", backgroundColor: "#372c2e" }}>
          お問い合せはこちら
        </a>
      </Link>
    </div>
  );
};

export default InquiryFooter;
