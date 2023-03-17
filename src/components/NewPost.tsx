import React from "react";
import { Form } from "react-router-dom";

export default function NewPost({ submitting }) {
  return (
    <div>
      <Form action="/posts/new" method="post">
        <label htmlFor="">
          title: <input type="text" name="title" placeholder="title" />
        </label>
        <label htmlFor="">
          body: <input type="text" name="body" placeholder="body" />
        </label>
        <input type="hidden" name="userId" value="1" />
        <input type="submit" value="add post" disabled={submitting} />
      </Form>
    </div>
  );
}
