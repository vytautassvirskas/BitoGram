import React,{useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import MainContext from '../../context/MainContext'
import "../Explore/Explore.css"

import UserDashBoard from '../../components/UserDashBoard/UserDashBoard'

const User = () => {
    const {userInfo}=useContext(MainContext)
    const [posts, setPosts] = useState([])
    const navigate=useNavigate()
    console.log(userInfo);
    useEffect(()=>{
        axios.get("/api/posts/user/"+userInfo.id)
        .then(resp=>{
          console.log(resp.data);
          setPosts(resp.data)
        })
        .catch(error=>{
            console.log(error);

            if(error.response.status===401){
				navigate("/")
			}
        })
      },[userInfo.id,navigate])
  return (
        <div className='posts-container'>
            <UserDashBoard 
            userId={userInfo.id}
            userName={userInfo.userName} 
            firstName={userInfo.firstName} 
            lastName={userInfo.lastName}
            userImage={userInfo.image}
            postsAmount={posts.length}
            />
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
            </div>
            <div className='card-bottom'>
                <p className='card-username'>{userInfo.userName}</p>
                <p className='card-caption'>{post.caption}</p>
            </div>
            

        </div>
        
        )}
        </div>
  )
}

export default User