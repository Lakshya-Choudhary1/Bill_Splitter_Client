import React from "react";

import TopNavBar from "./TopNavBar.jsx";
import BottomNavBar from "./BottomNavBar.jsx";


const MobileFrame = ({ children }) => {

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        flex
        justify-center
        items-center
      "
    >

      {/* Mobile Device Frame */}
      <div
        className="
          w-full
          h-screen
          max-w-[430px]
          bg-white
          relative
          overflow-hidden
          shadow-xl
        "
      >

        {/* Top Navbar */}
        <TopNavBar />


        {/* Page Area */}
        <main
          className="
            h-[calc(100vh-128px)]
            overflow-y-auto
            scrollbar-hide
          "
        >

          {children}

        </main>


        {/* Bottom Navigation */}
        <BottomNavBar/>


      </div>

    </div>
  );
};


export default MobileFrame;