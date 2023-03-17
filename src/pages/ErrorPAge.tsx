import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPAge() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status || ""} ---- {error.statusText || ""}
          {error.data.message} ---- {error.data.reason || ""}
        </h1>
      </div>
    );
  }
  console.log("error", error);
  return <div>error not in route</div>;
}
