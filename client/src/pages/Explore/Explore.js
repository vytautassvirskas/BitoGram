import React,{useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import "./Explore.css"
const Explore = () => {
  const [posts, setPosts] = useState([])
  const [like, setLike] = useState("https://www.svgrepo.com/show/13666/heart.svg")
	const navigate = useNavigate();

  useEffect(()=>{
    axios.get("/api/posts/")
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
  },[navigate])

  const handleClick = (id) =>{
    axios.post("/api/likes/new/", {like: "https://www.svgrepo.com/show/402155/red-heart.svg", postId: id})
    .then(resp=>{
      setLike("https://www.svgrepo.com/show/402155/red-heart.svg")
      // setComment('')
      // setRefresh(!refresh)
      console.log(resp.data);
  })
  .catch(error=>{
      console.log(error);
  })

  }
  return (
    <div className='posts-container'>
    {posts && posts.map(post=>
      <div key={post.id} className='card'>
        <div className='card-top'>
          <div className='user-info'>
            <Link to={"/user/"+post.userId} className="card-link">
              <img 
              className='card-img' 
              src="https://www.svgrepo.com/show/361411/account.svg" 
              alt="user" />
            </Link>
            <Link to={"/user/"+post.userId} className="card-link">
              <span className='card-username'>{post.user.userName}</span>
            </Link>
          </div>
            <img 
            className='card-img' 
            src="https://www.svgrepo.com/show/68522/more-with-three-dots-button.svg" 
            alt="more" />
        </div>
        <div className='card-middle'>
          <Link to={"/post/"+post.id} className='card-link'>
            <img 
            className='post-photo' 
            src={post.image} 
            alt="post" />
          </Link>
        </div>
        <div className='card-actions'>
          <img
          className={'card-img'+" "+"img-hover"}
          src={like}
          // src="https://www.svgrepo.com/show/13666/heart.svg" 
          // src="https://www.svgrepo.com/show/402155/red-heart.svg"
          alt="like-logo" 
          onClick={()=>handleClick(post.id)}/>
          <img
          className='card-img' 
          src="https://www.svgrepo.com/show/357540/comment.svg" 
          alt="comment-logo" />
        </div>
        <div className='card-bottom'>
          <p className='card-username'>{post.user.userName}</p>
          <p className='card-caption'>{post.caption}</p>
        </div>

      </div>
      )
      }
    </div>
  )
}

export default Explore