import Observer from "../../components/UI/Observer";
import { useEffect, useState } from "react";
import BlogPost from "../../components/blog/BlogPost";
import UnorderedList from "../../components/UnorderedList";
import LoadingSpinner from "../UI/LoadingSpinner";

const BlogList: React.FC<{ path: string }> = ({ path }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const [inView, setInview] = useState(false);

  useEffect(() => {
    setLoading(false); // this stops first fire on page load
    if (!(allLoaded || loading)) {
      setLoading(true);

      const fetchPosts = async (page: number, limit: number) => {
        try {
          const result = await fetch(
            `${path}?limit=${limit}&page=${page}`,
            { credentials: "include" }
          ); // fetchs first ten posts

          if (!result.ok) throw Error("Post Fetch Failed.");

          const data = (await result.json()) as PostModel[];

          return data;
        } catch (error) {
          return [];
        }
      };
      fetchPosts(page + 1, 5)
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
    <div>
      {loading ?? <LoadingSpinner></LoadingSpinner>}
      <UnorderedList>
        {posts &&
          posts.map(post => (
            <a key={post.id} href={`/blog/${post.id}`}>
              <BlogPost post={post} />
            </a>
          ))}
      </UnorderedList>
      <Observer setInView={setInview} />
    </div>
  );
};

export default BlogList;
