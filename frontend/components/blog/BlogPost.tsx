import Link from "next/link";
import React from "react";
import ListItem from "../ListItem";
import styles from "./BlogPost.module.css";

const BlogPost: React.FC<{ post: PostModel }> = ({ post }) => {
  return (
    <ListItem id={String(post.id)}>
      <h3 className={styles.title}>{post.title}</h3>
      <div className={styles.body}>
        <section>{post.body}</section>
        <small>{new Date(post.createdAt).toLocaleString()}</small>
      </div>
    </ListItem>
  );
};

export default BlogPost;
