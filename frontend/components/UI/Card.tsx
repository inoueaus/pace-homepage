import React from "react";

import styles from "./Card.module.css";

const Card: React.FC<{ className?: string, children: React.ReactNode }> = props => {
  return (
    <div
      className={`${styles.card} ${props.className && styles[props.className]}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
