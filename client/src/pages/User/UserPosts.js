import React,{useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import MainContext from '../../context/MainContext'
import "../Explore/Explore.css"

const User = () => {
    const {userInfo}=useContext(MainContext)
    const [posts, setPosts] = useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get("/api/posts/user/"+userInfo.id)
        .then(resp=>{
          console.log(resp.data);
          setPosts(resp.data)
        })
        .catch(error=>{
            console.log(error);

            if(error.response.status===401){
				setTimeout(() => navigate("/"),2000)
			}
        })
      },[userInfo.id])
  return (
        <div className='posts-container'>
        {posts && posts.map(post=>
        <div key={post.id} className='card'>
            <div className='card-top'>
            <div className='user-info'>
                <img 
                className='card-img' 
                src="https://www.svgrepo.com/show/361411/account.svg" 
                alt="user." />
                <span className='card-username'>{userInfo.userName}</span>
            </div>
            <img 
            className='card-img' 
            src="https://www.svgrepo.com/show/68522/more-with-three-dots-button.svg" 
            alt="more-info" />
            </div>
            <div className='card-middle'>
            <Link to={"/post/"+post.id} className='card-link'>
                <img 
                className='post-photo' 
                src={post.image} 
                alt="post." />
            </Link>
            </div>
            <div className='card-bottom'>
            <div className='card-actions'>
                <img
                className='card-img' 
                src="https://www.svgrepo.com/show/13666/heart.svg" 
                alt="like-logo" />
                <img
                className='card-img' 
                src="https://www.svgrepo.com/show/357540/comment.svg" 
                alt="comment-logo" />
            </div>
            <p className='card-caption'><span className='card-username'>{userInfo.userName}</span>{post.caption}</p>
            </div>

        </div>
        
        )}
        </div>
  )
}

export default User