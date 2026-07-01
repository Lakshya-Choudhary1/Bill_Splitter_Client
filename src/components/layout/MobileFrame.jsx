import React from "react";

const MobileFrame = ({ children }) => {
  return (
    <div
      className="
        w-full
        min-h-screen
        flex
        justify-center
        bg-linear-to-br
      from-blue-200
      via-white
      to-green-200
      "
    >
      <div
        className="
          w-full
          max-w-107.5
          min-h-screen
          bg-white
          relative
          overflow-hidden
          shadow-xl
        "
      >
        {children}
      </div>
    </div>
  );
};

export default MobileFrame;
