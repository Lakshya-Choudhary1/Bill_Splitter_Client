import React from "react";

const Loading = () => {
  return (
    <div className="
      w-full
      h-full
      flex
      items-center
      justify-center
      bg-transparent
    ">
      <div
        className="
          w-10
          h-10
          border-4
          border-white
          border-t-transparent
          rounded-full
          animate-spin
        "
      />
    </div>
  );
};

export default Loading;