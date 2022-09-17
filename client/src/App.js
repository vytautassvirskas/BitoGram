import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login"
import Alert from "./components/Alert/Alert"
import './App.css';

function App() {
  return (
   <BrowserRouter>
   {/* <Header></Header> */}
   <div className='container'>
    {/* <Alert/> */}
    <Routes>
      <Route path="/" element={<Login/>}></Route>
    </Routes>
   </div>
   </BrowserRouter>
  );
}

export default App;
