import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SinglePost from "../../components/blog/SinglePost";
import UnorderedList from "../../components/UnorderedList";

const Post: NextPage = () => {
  const router = useRouter();
  const id = Number(router.query);
  const [post, setPost] = useState<PostModel>();

  useEffect(() => {
    fetch(`${process.env.API_URI}/posts/${id}`)
      .then(result => {
        if (!result.ok) throw Error(`Post Fetch Failed: ${result.statusText}`);
        return result.json();
      })
      .then((data: PostModel) => {
        setPost(data);
      }); // fetchs first ten posts
  }, []);
  return <UnorderedList>{post && <SinglePost post={post} />}</UnorderedList>;
};

export default Post;
