import { useEffect, useState } from "react";
import SinglePost from "../../components/blog/SinglePost";
import UnorderedList from "../../components/UnorderedList";

const SingleBlogPost: React.FC<{ id: string | number }> = ({ id }) => {
  const [post, setPost] = useState<PostModel>({
    title: "",
    body: "",
    id: 999,
    createdAt: new Date(),
    updatedAt: new Date(),
    picture: null,
  });
  useEffect(() => {
    fetch(`${process.env.API_URI}/posts/${id}`)
      .then(result => {
        if (!result.ok) throw Error(`Post Fetch Failed: ${result.statusText}`);
        return result.json();
      })
      .then(data => {
        const formattedPost: PostModel = {
          ...data,
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
        };
        setPost(formattedPost);
      });
  });
  return (
    <UnorderedList>
      <SinglePost post={post} />
    </UnorderedList>
  );
};

export default SingleBlogPost;
