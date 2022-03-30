import React from "react";
import styles from "./ErrorBox.module.css";

const generateId = () => Math.random().toString(36).slice(4, 8);

const ErrorBox = React.forwardRef<HTMLDivElement, { errors: string[] }>(
  (props, ref) => {
    return (
      <div className={styles.errors} ref={ref}>
        <h5>以下の項目の記入が必要です。</h5>
        <ul>
          {props.errors.map(error => (
            <li key={generateId()}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
);

export default ErrorBox;
