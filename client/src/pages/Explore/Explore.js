import React,{useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import axios from "axios"


import "./Explore.css"

import ExplorePostCard from '../../components/ExplorePostCard/ExplorePostCard.js';


const Explore = () => {
  const [posts, setPosts] = useState([])
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

  return (
    <div className='posts-container'>
      <ExplorePostCard 
      posts={posts}
      liked={liked}
      setLiked={setLiked}
      />
    </div>
  )
}

export default Explore