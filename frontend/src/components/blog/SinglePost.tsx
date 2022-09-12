import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import ListItem from "../ListItem";
import styles from "./BlogPost.module.css";

const SinglePost: React.FC<{ post: PostModel }> = ({ post }) => {
  const context = useContext(AuthContext);

  const fileFormat = post.picture?.charAt(0) === "/" ? "jpeg" : "png";

  return (
    <ListItem id={String(post.id)}>
      {context.isAuth && (
        <a className={styles.link} href={`/admin/blog/${post.id}`}>
          編集
        </a>
      )}
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.body}>
        {post.picture && (
          <div className={styles["picture-container"]}>
            <img
              src={`data:image/${fileFormat};base64,${post.picture}`}
              style={{ maxWidth: "100%" }}
              className={styles.image}
            />
          </div>
        )}
        <section className={`${styles["body-text"]} ${styles["long-body"]}`}>
          {post.body}
        </section>

        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </ListItem>
  );
};

export default SinglePost;
