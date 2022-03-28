import type { NextPage } from "next";
import { useRouter } from "next/router";

const Post: NextPage = () => {
  const router = useRouter();

  return <div>Inquiry Page</div>;
};

export default Post;

export async function getServerSideProps(context) {
  console.log(context);
  return {
    props: {}, // will be passed to the page component as props
  };
}
