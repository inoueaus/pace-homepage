import type { NextPage } from "next";
import Link from "next/link";

const Blog: NextPage<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <div>
      <ul>
        {posts.map(post => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <li>
              <h3>{post.title}</h3>
              <small>{post.body}</small>
              <br />
              <small>{new Date(post.createdAt).toLocaleString()}</small>
            </li>
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
