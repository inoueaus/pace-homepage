import styles from "./InquiryFooter.module.css";

const InquiryFooter: React.FC = () => {
  return (
    <div className={styles["inquiry"]}>
      <h1>お問い合わせ</h1>

      <a href="/inquiry" style={{ color: "white", backgroundColor: "#372c2e" }}>
        お問い合せはこちら
      </a>
    </div>
  );
};

export default InquiryFooter;
