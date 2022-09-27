import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MainContext from '../../context/MainContext'
import Alert from '../../components/Alert/Alert.js'
import "./Login.css"

const Login = () => {
    const {setAlert,setLoggedIn,setUserInfo } =useContext(MainContext)
    const [ form, setForm ] = useState({
		email: '',
		password: ''
	});

    
    const navigate = useNavigate()
    

    const handleForm = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });  
	};
    
    const handleSubmit = (e) =>{
        e.preventDefault()

        axios.post('/api/users/login', form)
        .then(resp=>{
            setLoggedIn(true);
            setUserInfo(resp.data.user)
            console.log(resp.data);
            navigate("/explore")
        })
        .catch(error=>{
            console.log(error);
            setAlert({
                message: error.response.data,
                status: "danger"
            })

            // perkrauti puslapi
        })
        

    }


  return (
    <div className='login-container'>
        <div className='image-card'>
            <img 
            src='https://d33wubrfki0l68.cloudfront.net/d74da08f08b4a17c368b58d36ee23c368b4a6819/fff62/img/homepage/phones.png' 
            alt="phone"
            ></img>
        </div>
        <div className='login-register-card'>
            <div className='top'>
                <h1 className='logo-text'>Bitogram</h1>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
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
                    <Alert/>
                    <button className='main-btn'>Log in</button>
                </form>
            </div>
            <div className='bottom'>
                <h2>Have an account? 
                    <Link 
                    to={"/register"}
                    className="main-link"> Sign up</Link> 
                </h2>
            </div>
            <div className='store'></div>
        </div>
    </div>
  )
}

export default Login