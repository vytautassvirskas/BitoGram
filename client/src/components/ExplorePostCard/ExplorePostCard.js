import React, {useState, useContext} from 'react'
import {Link} from "react-router-dom"
import axios from "axios"

import MainContext from "../../context/MainContext.js";

import EmptyHeart from '../../components/Icons/EmptyHeart.js';
import FullHeartRed from '../../components/Icons/FullHeartRed.js';
import Comments from '../../components/Icons/Comments.js';
import CardTop from '../CardTop/CardTop.js';
import CardActionsRow from '../CardActionsRow/CardActionsRow.js';

import "./ExplorePostCard.css"

const ExplorePostCard = (props) => {
    const {userInfo} =useContext(MainContext)
    const {posts, liked, setLiked}=props 

  return (
   <>
   {posts && posts.map(post=>
      <div key={post.id} className='card'>
        <CardTop post={post}/>
        {/* <div className='card-top'>
          <div className='user-info-explorer'>
            <Link to={"/user/"+post.userId} className="card-link">
            <img 
              className='card-img' 
              src={post.user.image}
              alt="user" />
            </Link>
            <Link to={"/user/"+post.userId} className="card-link">
              <span className='card-username'>{post.user.userName}</span>
            </Link>
          </div>
            <img 
            className='card-img' 
            src="https://www.svgrepo.com/show/331863/dots-3.svg" 
            alt="more" />
        </div> */}
        <div className='card-middle'>
          <Link to={"/post/"+post.id} className='card-link'>
            <img 
            className='post-photo' 
            src={post.image} 
            alt="post" />
          </Link>
        </div>
        <CardActionsRow
        liked={liked}
        setLiked={setLiked}
        post={post}/>
        {/* <div className='card-actions'>
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
        </div> */}
        <div className='card-bottom'>
          <p className='card-username'>{post.user.userName}</p>
          <p className='card-caption'>{post.caption}</p>
        </div>

      </div>
      )
    }
   </>    
  )
}

export default ExplorePostCard