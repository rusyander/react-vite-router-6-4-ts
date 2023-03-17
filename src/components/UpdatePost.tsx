import React from "react";
import { Form } from "react-router-dom";

export default function UpdatePost({ id, title, body, userId, submitting }) {
  return (
    <div>
      <Form action={`/posts/${id}/edit`} method="post">
        <input
          type="text"
          name="title"
          placeholder="title"
          defaultValue={title}
        />
        <input type="text" name="body" placeholder="body" defaultValue={body} />
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="id" value={id} />

        <input type="submit" value="edit post" disabled={submitting} />
      </Form>
    </div>
  );
}
