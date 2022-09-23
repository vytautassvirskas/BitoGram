import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import axios from "axios";


import Header from './components/Header/Header'
import Login from "./pages/Login/Login"
import Register from './pages/Register/Register';
import Logout from "./pages/Logout/Logout"
import Explore from "./pages/Explore/Explore"
import UserPosts from "./pages/User/UserPosts"
import EditUser from './pages/User/EditUser';
import NotFound from './pages/NotFound/NotFound';
import SinglePost from './pages/SinglePost/SinglePost';
import NewPost from './pages/NewPost/NewPost';

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
  const [refresh,setRefresh] = useState(false)
  
  const contextValues = {alert, setAlert, loggedIn, setLoggedIn,userInfo, setUserInfo,refresh,setRefresh}

  useEffect(()=>{
    axios.get("/api/users/check-auth/")
    .then(resp=>{
      setLoggedIn(true)
      setUserInfo(resp.data)
      console.log(resp.data);
    })
  },[refresh])
  // console.log(refresh);

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
        <Route path="/post/:id" element={<SinglePost/>}></Route>
        <Route path='/user/posts' element={<UserPosts/>}></Route>
        <Route path='/user/new' element={<NewPost/>}></Route>
        <Route path='/user/edit/:id' element={<EditUser/>}></Route>
        <Route path='/user/:id' element={<UserPosts/>}></Route>

        <Route path='*' element={<NotFound/>}></Route>

      </Routes>
    </div>
   </MainContext.Provider>
   </BrowserRouter>
  );
}

export default App;
