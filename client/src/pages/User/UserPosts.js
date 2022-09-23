import React,{useEffect, useState, useContext} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import axios from "axios"

import "./UserPosts.css"

import MainContext from '../../context/MainContext'

import UserDashBoard from '../../components/UserDashBoard/UserDashBoard'
import UserDashBoardOther from '../../components/UserDashBoard/UserDashBoardOther'
import UserPostCard from '../../components/UserPostCard/UserPostCard'

const User = () => {
    const{userInfo}=useContext(MainContext)
    const{id}=useParams()
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})
    const navigate=useNavigate()
    window.scrollTo(0, 0)

    console.log("userInfo.id: "+userInfo.id);
    console.log("atidaryto userio.id: "+id);
    useEffect(()=>{
        axios.get("/api/posts/user/"+id)
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
      },[id,navigate])

      useEffect(()=>{
        axios.get("/api/users/"+id)
        .then(resp=>{
            console.log(resp.data);
            setUser(resp.data)
        })
        .catch(error=>{
            console.log(error);
    
            if(error.response.status===401){
              navigate("/")
            }
        })
      },[id,navigate])
  return (
    <>
        <div className='user-page-info'>
          {+userInfo.id===+id ?
            <UserDashBoard
            postsAmount={posts.length}
            id={id}
            user={user}
            /> 
           : 
            <UserDashBoardOther 
            postsAmount={posts.length}
            id={id}
            user={user}
            />
          }
            
        </div>
        <div className='user-posts-container'>
          <div className='user-posts-grid'>
          {posts && posts.map(post=>
          <Link key={post.id} to={"/post/"+post.id}>
              <UserPostCard
              key={post.id}
              postImage={post.image}
              likesTotal={post.likes.length}
              commentsTotal={post.comments.length}
              />
          </Link>
          )}
          </div>
        </div>
    </>
  )
}

export default User