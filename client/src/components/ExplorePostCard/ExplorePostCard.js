import React from 'react'
import {Link} from "react-router-dom"

import CardTop from '../CardTop/CardTop.js';
import CardActionsRow from '../CardActionsRow/CardActionsRow.js';
import TotalLikes from '../TotalLikes/TotalLikes.js';

import "./ExplorePostCard.css"

const ExplorePostCard = (props) => {
    const {posts}=props 

    

  return (
   <>
   {posts && posts.map(post=>
      <div key={post.id} className='card'>
        <CardTop post={post}/>
        <div className='card-middle'>
          <Link to={"/post/"+post.id} className='card-link'>
            <img 
            className='post-photo' 
            src={post.image} 
            alt="post" />
          </Link>
        </div>
        <CardActionsRow
        post={post}/>
        <TotalLikes
        totalLikes={post.likes.length}
        />
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