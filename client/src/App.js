import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from "axios";


import Header from './components/Header/Header'
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import Logout from "./pages/Logout/Logout"
import Explore from "./pages/Explore/Explore"
import User from "./pages/User/User"
import NotFound from './pages/NotFound/NotFound';
import SinglePost from './pages/SinglePost/SinglePost';

import Alert from "./components/Alert/Alert"
import './App.css';
import MainContext from './context/MainContext';

function App() {
  const [alert, setAlert] = useState({
    message: '',
    status: ""
  })
  const [loggedIn, setLoggedIn]=useState(false)
  const [userInfo, setUserInfo] = useState({})
  
  const contextValues = {alert, setAlert, loggedIn, setLoggedIn,userInfo, setUserInfo}

  useEffect(()=>{
    axios.get("/api/users/check-auth/")
    .then(resp=>{
      setLoggedIn(true)
      setUserInfo(resp.data)
    })
    
  },[])

  return (
   <BrowserRouter>
   <MainContext.Provider value={contextValues}>
    {loggedIn&&(<Header></Header>)}
    <div className='container'>
      <Alert/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path='/logout' element={<Logout/>}></Route>
        <Route path='/explore' element={<Explore/>}></Route>
        <Route path='/user' element={<User/>}></Route>
        <Route path="/post/:id" element={<SinglePost/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </div>
   </MainContext.Provider>
   </BrowserRouter>
  );
}

export default App;
