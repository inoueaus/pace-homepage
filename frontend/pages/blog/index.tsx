import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import BlogPost from "../../components/blog/BlogPost";
import UnorderedList from "../../components/UnorderedList";

const fetchPosts = async (page: number, limit: number) => {
  try {
    const result = await fetch(
      `${process.env.API_URI}/posts?limit=${limit}&page=${page}`,
      { credentials: "include" }
    ); // fetchs first ten posts

    if (!result.ok) throw Error("Post Fetch Failed.");

    const data = (await result.json()) as PostModel[];

    return data;
  } catch (error) {
    return false;
  }
};

const Blog: NextPage<{ preLoadedPosts: PostModel[] }> = ({ preLoadedPosts }) => {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState(preLoadedPosts);
  const [allLoaded, setAllLoaded] = useState(false);

  const handleScrollToBottom = () => fetchPosts(page, 5).then(data => {
    if (data) {

    }
  });

  return (
    <div>
      <UnorderedList>
        {posts && posts.map(post => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <a>
              <BlogPost post={post} />
            </a>
          </Link>
        ))}
      </UnorderedList>
    </div>
  );
};

export default Blog;

export const getServerSideProps = async () => {
  const data = await fetchPosts(0, 5);

  if (data) return { props: { preLoadedPosts: data } };

  return { props: { preLoadedPosts: [] } };
};
