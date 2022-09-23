import React, {useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import MainContext from '../../context/MainContext'


const EditUser = () => {
  const {id} = useParams()
  const {setAlert,refresh,setRefresh} =useContext(MainContext)
  const [form, setForm]=useState({
    firstName:"",
    lastName:"",
    userName:"",
    description:"",
    image:""
  })
  const navigate = useNavigate();
  
  useEffect(()=>{
    axios.get("/api/users/"+id)
    .then(resp=>{
        console.log(resp.data);
        setForm(resp.data)
    })
    .catch(error=>{
        console.log(error);

        if(error.response.status===401){
          navigate("/")
        }
    })
  },[])
 
  const handleForm = (e) => {
    setForm({...form, [e.target.name]: e.target.name==="image" ? e.target.files[0]: e.target.value })   
	};

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(form);
    const formData = new FormData();
		for (const key in form) {
			formData.append(key, form[key]);
		}
    console.log(formData);
    axios.put("/api/users/edit/"+id, formData)
    .then(resp=>{
      setRefresh(!refresh)
      console.log(resp.data);
      setAlert({
        message: resp.data,
        status: "success"
      })
      navigate("/user/posts")

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
                <h1 className='logo-text'>Bitogram </h1>
                <h2 className='add-text'>Let your friends to know newest information about you!</h2>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className='input-wrapper'>
                        <input 
                          value={form.firstName}
                          id="firstName"
                          type="text"
                          name="firstName"
                          onChange={handleForm}
                          placeholder="First name"
                        />
                    </div>
                    <div className='input-wrapper'>
                        <input 
                          value={form.lastName}
                          id="lastName"
                          type="text"
                          name="lastName"
                          onChange={handleForm}
                          placeholder="Last name"
                        />
                    </div>
                    <div className='input-wrapper'>
                        <input 
                          value={form.userName}
                          id="userName"
                          type="text"
                          name="userName"
                          onChange={handleForm}
                          placeholder="User name"
                        />
                    </div>
                    <div className='input-wrapper'>
                      <textarea
                        value={form.description}
                        style={{width:278.08, resize:"none"}}
                        rows="4"
                        id="description"
                        name="description"
                        onChange={handleForm}
                        placeholder="Description"
                      >
                      </textarea>
                    </div>
                    <div className='input-wrapper'>
                        <input 
                          id="password"
                          type="file"
                          name="image"
                          onChange={handleForm}
                        />                   
                    </div>
                    <button className='main-btn'>Save</button>
                </form>
            </div>
    </div>
  )
}

export default EditUser