import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';

import Alert from "./components/Alert/Alert"
import './App.css';
import MainContext from './context/MainContext';

function App() {
  const [alert, setAlert] = useState({
    message: '',
    status: ""
  })
  const contextValues = {alert, setAlert}

  return (
   <BrowserRouter>
   <MainContext.Provider value={contextValues}>
    {/* <Header></Header> */}
    <div className='container'>
      <Alert/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    </div>
   </MainContext.Provider>
   </BrowserRouter>
  );
}

export default App;
