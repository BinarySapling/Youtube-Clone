import React from "react";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold">Watch Page</h1>
      <p>Video ID: {id}</p>
    </div>
  );
};

export default Watch;
