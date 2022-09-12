import styles from "./ImageCard.module.css";

const ImageCard = props => {
  return (
    <div className={`${styles.card} ${styles[props.className]}`}>
      <section className={styles["image-section"]}>
        <img className={styles["image"]} src={props.image} />
      </section>
      <section className={styles["text-section"]}>{props.children}</section>
    </div>
  );
};

export default ImageCard;
