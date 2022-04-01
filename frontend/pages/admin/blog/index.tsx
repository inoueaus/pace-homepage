import type { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEventHandler, useRef } from "react";
import Card from "../../../components/UI/Card";
import FormFile from "../../../components/UI/input/FormFile";
import FormInput from "../../../components/UI/input/FormInput";
import FormSubmit from "../../../components/UI/input/FormSubmit";
import FormTextArea from "../../../components/UI/input/FormTextArea";
import { convertToB64, sendPost } from "../../../helpers/admin-helpers";

const AdminBlog: NextPage = () => {
  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const handlePostSubmit: FormEventHandler = event => {
    event.preventDefault();
    const title = titleRef.current!.value.trim();
    const body = bodyRef.current!.value.trim();
    const picture = pictureRef.current!.files;

    if (title && body) {
      if (picture && picture.length) {
        convertToB64(picture).then(b64Pic => {
          if (typeof b64Pic !== "string") throw TypeError("Pic not String");
          const data = { title, body, picture: b64Pic.split(",")[1] };
          return sendPost(data)
            .then(data => router.push(`/blog/${data.id}`))
            .catch(error => console.log(error));
        });
      } else {
        const data = { title, body };
        sendPost(data)
          .then(data => router.push(`/blog/${data.id}`))
          .catch(error => console.log(error));
      }
    }
  };

  return (
    <Card className="wide">
      <h4>新規投稿</h4>
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

export default AdminBlog;
