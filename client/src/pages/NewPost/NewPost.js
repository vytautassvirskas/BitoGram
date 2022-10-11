import axios from 'axios';
import React,{useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import MainContext from '../../context/MainContext';

const NewPost = () => {
    const {userInfo} = useContext(MainContext)
    const [form, setForm] =useState({
        caption:"",
        image:"" 
    })
    const navigate = useNavigate();

    const handleForm = (e) => {
		setForm({ ...form, [e.target.name]:e.target.name==="image" ? e.target.files[0]: e.target.value })
	};

    const handleSubmit = (e) =>{
        e.preventDefault()

        const formData = new FormData();
		for (const key in form) {
			formData.append(key, form[key]);
		}

        axios.post("/api/posts/new/", formData)
        .then(resp=>{
            console.log(resp.data);
            navigate("/user/"+userInfo.id)
        })
        .catch(error=>{
            console.log(error);
            if(error.response.status===401){
                navigate("/")
            }
        })
    }


  return (

    
    <div className='register-container'>
            <div className='top'>
                <h1 className='logo-text'>Bitogram</h1>
                <h2 className='add-text'>Create new post</h2>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className='input-wrapper'>
                        <label htmlFor='firstName'></label>
                        <input 
                        id="caption"
                        type="text"
                        name="caption"
                        onChange={handleForm}
                        placeholder="Caption..."
                        />
                    </div>
                    <div className='input-wrapper'>
                        <label htmlFor='password'></label>
                        <input 
                        id="image"
                        type="file"
                        name="image"
                        onChange={handleForm}
                        />                   
                    </div>
                    <button className='main-btn'>Upload</button>
                </form>
            </div>
    </div>
  )
}

export default NewPost