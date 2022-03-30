import React from "react";
import styles from "./FormInput.module.css";

const FormInput = React.forwardRef<
  HTMLInputElement,
  {
    config: {
      type: React.HTMLInputTypeAttribute;
      name: string;
      label: string;
      placeholder?: string;
    };
  }
>(({ config }, ref) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={config.name}>姓</label>
      <input
        name={config.name}
        type={config.type}
        placeholder={config.placeholder}
        ref={ref}
      />
    </div>
  );
});

export default FormInput;
