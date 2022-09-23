import React from 'react'
import {Link} from "react-router-dom"

import "./CardTop.css"

import Dots from '../Icons/Dots'

const CardTop = (props) => {
   const {post}=props
  return (
    <div className='card-top'>
          <div className='user-info-wrapper'>
            <Link to={"/user/"+post.userId}>
            <img 
              className='card-img' 
              // be klaustuku neveikia ant single post
              src={post.user?.image}
              alt="user" />
            </Link>
            <Link to={"/user/"+post.userId}>
              <span className='card-username'>{post.user?.userName}</span>
            </Link>
          </div>
            <Link to={"/user/"+post.userId}>
                <Dots />
            </Link>
        </div>
  )
}

export default CardTop