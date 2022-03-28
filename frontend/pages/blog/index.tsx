import type { NextPage } from "next";

interface Post {
  id: number;
}

const Blog: NextPage<{ posts: Post[] }> = props => {
  console.log(props);
  return <div>Blog Page</div>;
};

export default Blog;

export const getStaticProps = async () => {
  const result = await fetch(`${process.env.API_URI}/posts`);

  if (!result.ok) throw Error("Post Fetch Failed.");

  const data = await result.json();

  return { props: { posts: data } };
};
