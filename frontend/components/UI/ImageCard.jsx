import Image from "next/image";
import React from "react";
import styles from "./ImageCard.module.css";

const ImageCard = props => {
  return (
    <div className={styles.card}>
      <section className={styles["image-section"]}>
        <Image src={props.image} layout="responsive" />
      </section>
      <section className={styles["text-section"]}>{props.children}</section>
    </div>
  );
};

export default ImageCard;
