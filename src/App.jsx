import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import userStore from "./store/user.store.js";
import MobileFrame from "./components/layout/MobileFrame.jsx";
import { serverUrl } from "../config/config.js";

const App = () => {

  const { checkAuth, user } = userStore();

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <>
      <MobileFrame>

        <a href={`${serverUrl}/user/google`} >
            <button className="p-1 border border-black cursor-pointer">Google</button>
        </a>
        {user ? <h1>{user.name}</h1> : null}

        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-amber-400">
                hii
              </h1>
            }
          />
        </Routes>

      </MobileFrame>
    </>
  );
};

export default App;