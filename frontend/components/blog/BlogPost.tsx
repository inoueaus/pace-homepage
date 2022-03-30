import Image from "next/image";
import React from "react";
import ListItem from "../ListItem";
import styles from "./BlogPost.module.css";

const BlogPost: React.FC<{ post: PostModel; singlePost?: boolean }> = ({
  post,
  singlePost,
}) => {
  return (
    <ListItem id={String(post.id)}>
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.body}>
        <div className={styles["text-picture-container"]}>
          {post.picture && <Image src={post.picture} />}
          <section className={singlePost ? styles["long-body"] : undefined}>
            {post.body}
          </section>
        </div>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </ListItem>
  );
};

export default BlogPost;
