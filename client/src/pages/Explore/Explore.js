import React,{useEffect, useState} from 'react'
import axios from "axios"

import "./Explore.css"
const Explore = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get("/api/posts/")
    .then(resp=>{
      console.log(resp.data);
      setPosts(resp.data)
    })
  },[])
  return (
    <div className='posts-container'>
    {posts && posts.map(post=>
      <div key={post.id} className='card'>
        <div className='card-top'>
          <div className='user-info'>
            <img 
            className='card-img' 
            src="https://www.svgrepo.com/show/361411/account.svg" 
            alt="user=photo" />
            <span className='card-username'>{post.user.userName}</span>
          </div>
          <img 
          className='card-img' 
          src="https://www.svgrepo.com/show/68522/more-with-three-dots-button.svg" 
          alt="more-info" />
        </div>
        <div className='card-middle'>
          <img 
          className='post-photo' 
          src={post.image} 
          alt="post-photo" />
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
          <p className='card-caption'><span className='card-username'>{post.user.userName}</span>{post.caption}</p>
        </div>

      </div>
      
      )}
    </div>
  )
}

export default Explore