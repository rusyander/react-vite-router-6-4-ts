import { Suspense } from "react";
import {
  Link,
  useLoaderData,
  useSearchParams,
  useAsyncValue,
  Await,
  defer,
  json,
} from "react-router-dom";
import { BlogFilter } from "../components/BlogFilter";

const Blog2 = () => {
  const item = useAsyncValue();
  console.log("item", item);

  return <div>Blog2</div>;
};

const Blogpage = () => {
  const { posts } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const postQuery = searchParams.get("post") || "";
  const latest = searchParams.has("latest");

  const startsFrom = latest ? 80 : 1;

  return (
    <div>
      <h1>Our news</h1>

      <BlogFilter
        postQuery={postQuery}
        latest={latest}
        setSearchParams={setSearchParams}
      />

      <Link
        to="/posts/new"
        style={{ margin: "1rem 0", display: "inline-block" }}
      >
        Add new post
      </Link>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Await resolve={posts}>
          {(resolvedPosts) => (
            <>
              {resolvedPosts
                .filter(
                  (post) =>
                    post.title.includes(postQuery) && post.id >= startsFrom
                )
                .map((post) => (
                  <Link key={post.id} to={`/posts/${post.id}`}>
                    <li>{post.title}</li>
                  </Link>
                ))}
            </>
          )}
        </Await>
      </Suspense>
      <Suspense>
        <Await resolve={posts}>
          <Blog2 />
        </Await>
      </Suspense>
    </div>
  );
};

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   if (!res.ok) {
  //     throw new Response("", { status: res.status, statusText: "Not found" });
  //   }
  return res.json();
}

const blogLoader = async ({ request, params }) => {
  console.log("request", request);
  console.log("params", params);

  const posts = await getPosts();

  if (!posts.length) {
    throw json(
      { message: "Not found", reason: "Wrong url" },
      { status: 404, statusText: "Not found" }
    );
  }

  return defer({
    posts,
  });
  //   return {
  //     posts: await getPosts(),
  //     item: await getPosts(),
  //   };
};

export { Blogpage, blogLoader };
