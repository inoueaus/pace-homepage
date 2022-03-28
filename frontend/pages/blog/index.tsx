import type { NextPage } from "next";

const Blog: NextPage = props => {
  console.log(props);
  return <div>Blog Page</div>;
};

export default Blog;

export const getStaticProps = async () => {
  return { props: { test: "test" } };
};
