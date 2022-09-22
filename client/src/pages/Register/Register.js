import React, {useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainContext from '../../context/MainContext'
import "../Login/Login.css"
import "./Register.css"

const Register = () => {
  const {setAlert} =useContext(MainContext)
  const [form, setForm]=useState({
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
    password:""
  })

  const navigate = useNavigate();

  const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });   
	};

  const handleSubmit = (e) =>{
    e.preventDefault()

    axios.post("/api/users/register", form)
    .then(resp=>{
      console.log(resp.data);
      setAlert({
        message: resp.data,
        status: "success"
      })
      navigate("/")

    })
    .catch(error=>{
      console.log(error);
      setAlert({
        message: error.response.data,
        status: "danger"
      })
    })
        

  }

  return (
    <div className='register-container'>
            <div className='top'>
                <h1 className='logo-text'>Bitogram</h1>
                <h2 className='add-text'>Sign up to see photos from your friends.</h2>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className='input-wrapper'>
                        {/* <label htmlFor='firstName'>Email</label> */}
                        <input 
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={handleForm}
                        placeholder="First name"
                        />
                    </div>
                    <div className='input-wrapper'>
                        {/* <label htmlFor='lastName'>Email</label> */}
                        <input 
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={handleForm}
                        placeholder="Last name"
                        />
                    </div>
                    <div className='input-wrapper'>
                        {/* <label htmlFor='userName'>Email</label> */}
                        <input 
                        id="userName"
                        type="text"
                        name="userName"
                        onChange={handleForm}
                        placeholder="User name"
                        />
                    </div>
                    <div className='input-wrapper'>
                        {/* <label htmlFor='email'>Email</label> */}
                        <input 
                        id="email"
                        type="text"
                        name="email"
                        onChange={handleForm}
                        placeholder="Email"
                        />
                    </div>
                    <div className='input-wrapper'>
                        {/* <label htmlFor='password'>Password</label> */}
                        <input 
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleForm}
                        placeholder="Password"
                        />                   
                    </div>
                    <button className='main-btn'>Sign up</button>
                </form>
            </div>
            <div className='bottom'>
                <h2>Have an account? 
                    <Link 
                    to={"/"}
                    className="main-link"> Log in</Link> 
                </h2>
            </div>
            <div className='store'></div>

    </div>
  )
}

export default Register