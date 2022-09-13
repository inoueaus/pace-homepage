import Observer from "../../components/UI/Observer";
import { useEffect, useState } from "react";
import BlogPost from "../../components/blog/BlogPost";
import UnorderedList from "../../components/UnorderedList";
import type { PostModel } from "../../../types/post-model";
import styles from "./BlogPost.module.css";
import { SingleBlogPost, tagName } from "../lit-components/single-blog-post";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "single-blog-post": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

if (!window.customElements.get(tagName)) {
  window.customElements.define(tagName, SingleBlogPost);
}
const controller = new AbortController();

const BlogList: React.FC<{ path: string }> = ({ path }) => {
  const [page, setPage] = useState(0);
  const [postId, setPostId] = useState(0);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [inView, setInview] = useState(false);

  useEffect(() => {
    window.addEventListener("popstate", () => setPostId(0), {
      signal: controller.signal,
    });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!(allLoaded || loading)) {
      setLoading(true);
      const fetchPosts = async (page: number, limit: number) => {
        try {
          const result = await fetch(
            `${path}/posts?limit=${limit}&page=${page}`,
            {
              credentials: "include",
            }
          ); // fetchs first ten posts

          if (!result.ok) throw Error("Post Fetch Failed.");

          const data = (await result.json()) as PostModel[];

          return data;
        } catch (error) {
          return [];
        }
      };
      fetchPosts(page, 5)
        .then(data => {
          if (data.length) {
            setPage(prev => prev + 1); // load more if not on last page
            setPosts(prev => [...prev, ...data]);
          } else {
            setAllLoaded(true);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [inView]);

  return (
    <>
      {postId ? (
        <single-blog-post api-path={path} post-id={postId}></single-blog-post>
      ) : (
        <>
          {loading && posts.length === 0 && (
            <div className={styles["spinner-container"]}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#de9e48"
                className={styles.spinner}
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z" />
              </svg>
            </div>
          )}
          <UnorderedList>
            {posts &&
              posts.map(post => (
                <a
                  key={post.id}
                  onClick={() => {
                    const newUrl = new URL(window.location.href);
                    newUrl.searchParams.set("post-id", String(post.id));
                    window.history.pushState(
                      { postId: post.id },
                      "",
                      newUrl
                    );
                    setPostId(post.id);
                  }}
                >
                  <BlogPost post={post} />
                </a>
              ))}
          </UnorderedList>
          <Observer setInView={setInview} />
        </>
      )}
    </>
  );
};

export default BlogList;
