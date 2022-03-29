import type { NextPage } from "next";
import Link from "next/link";
import BlogPost from "../../components/blog/BlogPost";
import UnorderedList from "../../components/UnorderedList";

const Blog: NextPage<{ posts: PostModel[] }> = ({ posts }) => {
  return (
    <div>
      <UnorderedList>
        {posts.map(post => (
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
  const result = await fetch(`${process.env.API_URI}/posts`); // fetchs first ten posts

  if (!result.ok) throw Error("Post Fetch Failed.");

  const data = await result.json();

  return { props: { posts: data } };
};
