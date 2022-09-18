import React, { useState } from "react";
import styles from "./FormInput.module.css";

const FormFile = React.forwardRef<
  HTMLInputElement,
  {
    config: {
      name: string;
      label: string;
      placeholder?: string;
    };
  }
>(({ config }, ref) => {
  const [fileName, setFileName] = useState("ファイルを選択");

  const handleFileChange: React.ChangeEventHandler<
    HTMLInputElement
  > = event => {
    if (event.target.files && event.target.files[0]) {
      const fileName = event.target.files[0].name;
      const formattedName =
        fileName.length > 10
          ? `${fileName.slice(0, 5)}...${fileName.split(".")[1]}`
          : fileName;
      setFileName(formattedName);
    }
  };

  return (
    <div className={styles["form-group"]}>
      <label htmlFor={config.name}>{config.label}</label>
      <label className={styles["file-label"]}>
        {fileName}
        <input
          name={config.name}
          id={config.name}
          className={styles.file}
          type="file"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
          ref={ref}
        />
      </label>
    </div>
  );
});

export default FormFile;
