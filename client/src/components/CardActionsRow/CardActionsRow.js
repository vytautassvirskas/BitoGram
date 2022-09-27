import React, {useContext} from 'react'
import { Link } from 'react-router-dom';
import axios from "axios"


import "./CardActionsRow.css"

import MainContext from "../../context/MainContext.js";

import EmptyHeart from '../../components/Icons/EmptyHeart.js';
import FullHeartRed from '../../components/Icons/FullHeartRed.js';
import CommentsIcon from '../../components/Icons/Comments.js';



const CardActionsRow = (props) => {
  const {userInfo, liked, setLiked} =useContext(MainContext)
  const {post}=props

  const handleClick = (id) =>{
    axios.post("/api/likes/new/", {like: "1", postId: id})
    .then(resp=>setLiked(!liked))
  .catch(error=>{
      console.log(error);
  })
  }
  return (
    <div className='card-actions'>
          <div onClick={()=>handleClick(post.id)} >
            {post.likes.find(like=>like.userName===userInfo.userName)?(
              <FullHeartRed/> 
            ):(
              <EmptyHeart/>
            )
            }
          </div>
          <Link to={`/post/${post.id}`}>
            <CommentsIcon/>
          </Link>
    </div>
  )
}

export default CardActionsRow