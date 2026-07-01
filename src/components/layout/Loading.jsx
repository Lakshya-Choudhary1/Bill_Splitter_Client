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
          w-6
          h-6
          border-3
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