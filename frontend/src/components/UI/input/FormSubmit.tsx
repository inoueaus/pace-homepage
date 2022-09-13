import { LoadingIcon, tagName } from "../../lit-components/loading-icon";
import styles from "./FormSubmit.module.css";

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, LoadingIcon);
}

const FormSubmit: React.FC<{ loading?: boolean }> = ({ loading }) => {
  return (
    <button className={styles.submit} type="submit">
      {loading ? <loading-icon /> : "送信"}
    </button>
  );
};

export default FormSubmit;
