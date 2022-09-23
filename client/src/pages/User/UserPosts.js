import React,{useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import MainContext from '../../context/MainContext'
import "../Explore/Explore.css"
import "./UserPosts.css"

import UserDashBoard from '../../components/UserDashBoard/UserDashBoard'
import UserPostCard from '../../components/UserPostCard/UserPostCard'

const User = () => {
    const {userInfo}=useContext(MainContext)
    const [posts, setPosts] = useState([])
    const navigate=useNavigate()
    // console.log(userInfo);
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
    <>
        <div className='user-page-info'>
            <UserDashBoard 
            postsAmount={posts.length}
            />
        </div>
        <div className='user-posts-container'>
          <div className='user-posts-grid'>
          {posts && posts.map(post=>
          <Link to={"/post/"+post.id}>
              <UserPostCard
              key={post.id}
              postImage={post.image}
              likesTotal={post.likes.length}
              commentsTotal={post.comments.length}
              />
          </Link>
          )}
          </div>
        </div>
    </>
  )
}

export default User