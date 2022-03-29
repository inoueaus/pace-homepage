import type { NextPage } from "next";
import Link from "next/link";
import BlogPost from "../../components/blog/BlogPost";

const Blog: NextPage<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map(post => (
          <Link key={post.id} href={`/blog/${post.id}`} passHref={true}>
            <BlogPost post={post} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Blog;

export const getStaticProps = async () => {
  const result = await fetch(`${process.env.API_URI}/posts`); // fetchs first ten posts

  if (!result.ok) throw Error("Post Fetch Failed.");

  const data = await result.json();

  return { props: { posts: data } };
};
