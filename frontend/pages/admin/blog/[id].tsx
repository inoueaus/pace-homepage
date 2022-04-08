import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import Card from "../../../components/UI/Card";
import FormFile from "../../../components/UI/input/FormFile";
import FormInput from "../../../components/UI/input/FormInput";
import FormSubmit from "../../../components/UI/input/FormSubmit";
import FormTextArea from "../../../components/UI/input/FormTextArea";
import { convertToB64, updatePost } from "../../../helpers/admin-helpers";

const AdminPostEdit: NextPage<{ post: PostModel }> = ({ post }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current!.value = post.title;
    bodyRef.current!.value = post.body;
  }, [titleRef, bodyRef, pictureRef]);

  const handlePostSubmit: FormEventHandler = event => {
    event.preventDefault();
    const title = titleRef.current!.value.trim();
    const body = bodyRef.current!.value.trim();
    const picture = pictureRef.current!.files;

    if (title && body) {
      if (picture && picture.length) {
        if (picture[0].size > 1024 * 500) {
          setErrors("画像サイズは500KBまで");
        } else {
          convertToB64(picture).then(b64Pic => {
            if (typeof b64Pic !== "string") throw TypeError("Pic not String");
            const data = { title, body, picture: b64Pic.split(",")[1] };
            return updatePost(post.id, data)
              .then(data => router.push(`/blog/${data.id}`))
              .catch(error => console.log(error));
          });
        }
      } else {
        const data = { title, body };
        updatePost(post.id, data)
          .then(data => router.push(`/blog/${data.id}`))
          .catch(error => console.log(error));
      }
    }
  };

  return (
    <Card className="wide">
      <h4>新規投稿</h4>
      {errors && <div style={{ color: "red" }}>{errors}</div>}
      <form onSubmit={handlePostSubmit}>
        <FormInput
          config={{ type: "text", name: "title", label: "題名" }}
          ref={titleRef}
        />
        <FormTextArea config={{ name: "body", label: "内容" }} ref={bodyRef} />
        <FormFile
          config={{ label: "写真", name: "picture" }}
          ref={pictureRef}
        />
        <FormSubmit />
      </form>
    </Card>
  );
};

export default AdminPostEdit;

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
