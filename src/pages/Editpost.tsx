import {
  useParams,
  useLoaderData,
  useNavigation,
  useActionData,
} from "react-router-dom";
import UpdatePost from "../components/UpdatePost";

const Editpost = () => {
  //   const { id } = useParams();

  const { post, id } = useLoaderData();
  const navigator = useNavigation();

  const messageData = useActionData();

  return (
    <div>
      {messageData?.message && <div>{messageData?.message}</div>}
      <h1>Edit post {id}</h1>
      <UpdatePost {...post} submitting={navigator.state === "submitting"} />
    </div>
  );
};

const updatePost = async (post) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${post.get("id")}`,
    {
      method: "PUT",
      body: post,
    }
  );
  return res.json();
};

const updatePostAction = async ({ request }) => {
  const formData = await request.formData();

  if (!formData.get("title") || !formData.get("body")) {
    return { message: "Title and body are required" };
  }

  const updatedPost = await updatePost(formData);
  return { message: `Post ${updatedPost.id} updated`, redirect: "/posts" };
};

export { Editpost, updatePostAction };
