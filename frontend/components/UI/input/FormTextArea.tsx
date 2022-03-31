import React from "react";
import styles from "./FormInput.module.css";

const FormTextArea = React.forwardRef<
  HTMLTextAreaElement,
  {
    config: {
      name: string;
      label: string;
      placeholder?: string;
    };
  }
>(({ config }, ref) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={config.name}>{config.label}</label>
      <textarea name={config.name} ref={ref} />
    </div>
  );
});

export default FormTextArea;
