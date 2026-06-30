import React from "react";

const MobileFrame = ({ children }) => {
  return (
    <div
      className="
        w-full
        min-h-screen
        bg-gray-100
        flex
        justify-center
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
