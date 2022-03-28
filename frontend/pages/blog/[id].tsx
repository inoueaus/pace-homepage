import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = props => {
  const router = useRouter();

  console.log(props);

  return <div>Post</div>;
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  if (isNaN(Number(query.id))) {
    res.statusCode = 302;
    res.setHeader("location", "/blog");
    res.end();
    return { props: {} };
  }

  try {
    const result = await fetch(`${process.env.API_URI}/posts/${query.id}`); // fetchs first ten posts

    if (!result.ok) throw Error(`Post Fetch Failed: ${result.statusText}`);

    const data = await result.json();

    return { props: { post: data } };
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("location", "/blog");
    res.end();
  }
  return {
    props: {},
  };
};
