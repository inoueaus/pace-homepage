import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import BlogPost from "../../components/blog/BlogPost";
import UnorderedList from "../../components/UnorderedList";

const Post: NextPage<{ post: PostModel }> = ({ post }) => {
  const router = useRouter();

  return (
    <UnorderedList>
      <BlogPost post={post} singlePost={true}/>
    </UnorderedList>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  if (isNaN(Number(query.id))) {
    res.statusCode = 302;
    res.setHeader("location", "/blog"); // redirect to blog if invalid post id
    res.end();
    return { props: {} };
  }

  try {
    const result = await fetch(`${process.env.API_URI}/posts/${query.id}`); // fetchs first ten posts

    if (!result.ok) throw Error(`Post Fetch Failed: ${result.statusText}`);

    const data = await result.json();

    return { props: { post: data } }; // only return data on successful fetch
  } catch (error) {
    res.statusCode = 302;
    res.setHeader("location", "/blog");
    res.end();
  }
  return {
    props: {}, // return no data by default
  };
};
