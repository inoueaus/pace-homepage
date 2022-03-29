import React from "react";
import styles from "./UnorderedList.module.css";

const UnorderedList: React.FC = props => {
  return <ul className={styles["generic-ul"]}>{props.children}</ul>;
};

export default UnorderedList;
