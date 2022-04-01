import Image from "next/image";
import Link from "next/link";
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
        <Link href={`/admin/blog/${post.id}`}>
          <a className={styles.link}>編集</a>
        </Link>
      )}
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.body}>
        {post.picture && (
          <Image
            src={`data:image/${fileFormat};base64,${post.picture}`}
            layout="responsive"
            objectFit="contain"
            width="200px"
            height="200px"
          />
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
