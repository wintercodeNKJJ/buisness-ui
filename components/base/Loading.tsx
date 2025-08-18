import React from "react";

const Loading = ({ status }: { status?: string }) => {
  return (
    <main>
      <div>{status ? status : "An error occured"}</div>
    </main>
  );
};

export default Loading;
