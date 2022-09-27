import React from 'react'

import "./TotalLikes.css"

const TotalLikes = (props) => {
    const {totalLikes} = props
  return (
      <>
      {totalLikes>0 && 
         <p className='total-likes'><span>{totalLikes} </span>{
            totalLikes===1 ? "like" : "likes"
            }</p>
      }
    </>
  )
}

export default TotalLikes