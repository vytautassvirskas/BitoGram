import React, {useContext} from 'react'
import axios from "axios"


import "./CardActionsRow.css"

import MainContext from "../../context/MainContext.js";

import EmptyHeart from '../../components/Icons/EmptyHeart.js';
import FullHeartRed from '../../components/Icons/FullHeartRed.js';
import Comments from '../../components/Icons/Comments.js';



const CardActionsRow = (props) => {
  const {userInfo, liked, setLiked} =useContext(MainContext)

  // gal liked ir setLiked persimesti i maincontext
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
          <div className='card-like-img-wrapper' onClick={()=>handleClick(post.id)} >
            {
            post.likes.find(like=>like.userName===userInfo.userName)?(
              <FullHeartRed/> 
            ):(
              <EmptyHeart/>
            )
            }
          </div>
          <Comments/>
    </div>
  )
}

export default CardActionsRow