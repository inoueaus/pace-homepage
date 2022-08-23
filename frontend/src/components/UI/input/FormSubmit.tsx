import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./FormSubmit.module.css";

const FormSubmit: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <button className={styles.submit} type="submit">
      {loading ? <LoadingSpinner /> : "送信"}
    </button>
  );
};

export default FormSubmit;
