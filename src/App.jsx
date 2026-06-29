import React from 'react'
import {Routes,Route} from "react-router-dom";

import toast from 'react-hot-toast';

const App = () => {

  toast.success("Expense added");


  return (<>
    
    <Routes>
      <Route path='/' element={<h1>hii</h1>
      }></Route>

    </Routes>
  </>
  )
}

export default App
