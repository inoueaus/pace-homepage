import styles from "./ImageCard.module.css";

const ImageCard = props => {
  console.log(`${styles["image-section"]} ${styles[props.className]}`);
  return (
    <div className={`${styles.card} ${styles[props.className]}`}>
      <section className={styles["image-section"]}>
        <img src={props.image} />
      </section>
      <section className={styles["text-section"]}>{props.children}</section>
    </div>
  );
};

export default ImageCard;
