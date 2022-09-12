import type { FC } from "react";
import ListItem from "../ListItem";
import styles from "./BlogPost.module.css";

const BlogPost: FC<{ post: PostModel; singlePost?: boolean }> = ({
  post,
  singlePost,
}) => {
  const fileFormat = post.picture?.charAt(0) === "/" ? "jpeg" : "png";
  return (
    <ListItem id={String(post.id)}>
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.body}>
        <div className={styles["text-picture-container"]}>
          {post.picture && (
            <div className={styles["picture"]}>
              <img
                src={`data:image/${fileFormat};base64,${post.picture}`}
                width="100%"
                height="100%"
                style={{ maxWidth: "100%" }}
              />
            </div>
          )}
          <section
            className={`${styles["body-text"]} ${
              singlePost && styles["long-body"]
            }`}
          >
            <div className={styles["text-container"]}>{post.body}</div>
            <div className={styles.fade}></div>
          </section>
        </div>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </ListItem>
  );
};

export default BlogPost;
