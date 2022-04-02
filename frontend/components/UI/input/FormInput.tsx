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
      autoComplete?: string;
    };
  }
>(({ config }, ref) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={config.name}>{config.label}</label>
      <input
        name={config.name}
        type={config.type}
        placeholder={config.placeholder}
        autoComplete={config.autoComplete}
        ref={ref}
      />
    </div>
  );
});

export default FormInput;
