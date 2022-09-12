import { useEffect, useState } from "react";
import styles from "./BlogPost.module.css";
import UnorderedList from "../../components/UnorderedList";
import ListItem from "../ListItem";
import type { PostModel } from "../../../types/post-model";

const SingleBlogPost: React.FC<{ path: string }> = ({ path }) => {
  const [post, setPost] = useState<PostModel>({
    title: "",
    body: "",
    id: 999,
    createdAt: new Date(),
    updatedAt: new Date(),
    picture: null,
  });

  useEffect(() => {
    fetch(path)
      .then(result => {
        if (!result.ok) throw Error(`Post Fetch Failed: ${result.statusText}`);
        return result.json();
      })
      .then(data => {
        const formattedPost: PostModel = {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
        setPost(formattedPost);
      });
  }, []);

  const fileFormat = post.picture?.charAt(0) === "/" ? "jpeg" : "png";

  return (
    <UnorderedList>
      <ListItem id={String(post.id)}>
        {Boolean(Number(window.localStorage.getItem("isAuth"))) && (
          <a href={`/admin/blog/${post.id}`}>
            <button type="button" style={{ width: "100%", height: "50px" }}>編集</button>
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

          <small>{post.createdAt.toLocaleString()}</small>
        </div>
      </ListItem>
    </UnorderedList>
  );
};

export default SingleBlogPost;
