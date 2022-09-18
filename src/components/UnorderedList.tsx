import styles from "./UnorderedList.module.css";

const UnorderedList: React.FC<{ children: React.ReactNode }> = props => {
  return <ul className={styles["generic-ul"]}>{props.children}</ul>;
};

export default UnorderedList;
