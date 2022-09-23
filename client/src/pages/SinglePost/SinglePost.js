import React,{ useState, useEffect} from 'react'
import {useParams,Link, useNavigate} from "react-router-dom"
import axios from "axios"

import "./SinglePost.css"

import CardTop from '../../components/CardTop/CardTop.js';

const SinglePost = () => {
    const {id}=useParams()
    const [post, setPost] = useState({})
    const [comment, setComment] =useState("")
    const [refresh, setRefresh] = useState(false)

    const navigate=useNavigate()

    useEffect(()=>{
        axios.get("/api/posts/"+id)
        .then(resp=>{
            console.log(resp.data);
            setPost(resp.data)
        })
        .catch(error=>{
            console.log(error);

            if(error.response.status===401){
				setTimeout(() => navigate("/"),2000)
			}
        })
    },[refresh,id, navigate])

    
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post("/api/comments/new/", {comment, postId: id})
        .then(resp=>{
            setComment('')
            setRefresh(!refresh)
            console.log(resp.data);
        })
        .catch(error=>{
            console.log(error);
        })

    }


  return (
    <div className='single-post'>
        <div className='single-post-left'>
            <img 
            className='single-post-img' 
            src={post.image} 
            alt="post" />
        </div>
        <div className='single-post-right'>
        <CardTop post={post} />
            {/* <div className='card-top'>
                <div className='user-info'>
                    <Link to={"/user/"+post.userId} className="card-link">
                    <img 
                    className='card-img' 
                    src="https://www.svgrepo.com/show/361411/account.svg" 
                    alt="user" />
                    </Link>
                    <Link to={"/user/"+post.userId} className="card-link">
                    <span className='card-username'>{post.user?.userName}</span>
                    </Link>
                </div>
                <img 
                className='card-img' 
                src="https://www.svgrepo.com/show/68522/more-with-three-dots-button.svg" 
                alt="more" />
            </div> */}
            <div className='comment-section'>
                {post.comments && post.comments.map(comment=>
                    <div className='comment-wrapepr' key={comment.id}>
                        <div className='comment-photo-wrapper'>
                            <img src="https://www.svgrepo.com/show/361411/account.svg" alt="user" />
                        </div>
                        <p className='comment-author'>{comment.userName}</p>
                        <p>{comment.comment}</p>
                        
                    </div>
                )}
                
            </div>
            <div className='card-actions'>
                <img
                className='card-img' 
                src="https://www.svgrepo.com/show/13666/heart.svg" 
                alt="like-logo" />
                <img
                className='card-img' 
                src="https://www.svgrepo.com/show/357540/comment.svg" 
                alt="comment-logo" />
            </div>
            <form className='comment-form' onSubmit={(e)=>handleSubmit(e)}>
                <div className='emoji-img-wrapper'>
                    <img className='emoji-img'
                    src="https://www.svgrepo.com/show/166327/smile.svg" 
                    alt="emoji" />
                </div>
                <textarea className='comment-text-area'
                value={comment}
                name="comment"  
                rows="1"
                placeholder='Add a comment...'
                onChange={(e)=>setComment(e.target.value)}></textarea>
                <div className='comment-post-btn-wrapper'>
                    <button className='comment-post-btn'>Post</button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default SinglePost