import React,{useEffect, useState, useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"

import MainContext from "../../context/MainContext.js";
import "./Explore.css"

import EmptyHeart from '../../components/Hearts/EmptyHeart.js';
import FullHeart from '../../components/Hearts/FullHeart.js';


const Explore = () => {
  const {userInfo } =useContext(MainContext)
  const [posts, setPosts] = useState([])
  const [likes, setLikes] = useState([])
  const [liked, setLiked] = useState(false)
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
  },[navigate, liked])


  const handleClick = (id) =>{
    axios.post("/api/likes/new/", {like: "1", postId: id})
    .then(resp=>{
      setLiked(!liked)
      setLikes(resp.data)

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
          <div className='user-info-explorer'>
            <Link to={"/user/"+post.userId} className="card-link">
            <img 
              className='card-img' 
              src={post.user.image}
              alt="user" />
              {/* <img 
              className='card-img' 
              src="https://www.svgrepo.com/show/361411/account.svg" 
              alt="user" /> */}
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
          <div className='card-like-img-wrapper' onClick={()=>handleClick(post.id)} >
            {
            post.likes.find(like=>like.userName===userInfo.userName)?(
              <FullHeart/> 
            ):(
              <EmptyHeart/>
            )
            }
           
          </div>
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