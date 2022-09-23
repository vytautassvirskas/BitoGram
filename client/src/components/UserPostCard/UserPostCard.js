import React from 'react'

import CommentsWhite from '../Icons/CommentsWhite'
import FullHeartWhite from '../Icons/FullHeartWhite'

import "./UserPostCard.css"

const UserPostCard = (props) => {
    const {postImage,likesTotal,commentsTotal}=props


  return (
    <div className='user-post-card'>
        <img src={postImage} alt="post" />
        <div className='transparent'>
        </div>
        <div className='transparent-icons-wrapper'>
          <div>
            <FullHeartWhite />
            <span>{likesTotal}</span>
          </div>
          <div>
            <CommentsWhite/>
            <span>{commentsTotal}</span>  
          </div>
        </div>
    </div>
  )
}

export default UserPostCard