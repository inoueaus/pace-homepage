import React from "react";
import styles from "./FormSubmit.module.css";

const FormSubmit: React.FC = () => {
  return (
    <button className={styles.submit} type="submit">
      送信
    </button>
  );
};

export default FormSubmit;
