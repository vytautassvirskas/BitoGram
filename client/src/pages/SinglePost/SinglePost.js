import React,{ useState, useEffect,useContext} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"

import "./SinglePost.css"
import MainContext from '../../context/MainContext'
import CardTop from '../../components/CardTop/CardTop.js';
import CardActionsRow from '../../components/CardActionsRow/CardActionsRow';

const SinglePost = () => {
    const{liked}=useContext(MainContext)
    const {id}=useParams()
    const [post, setPost] = useState({})
    const [comment, setComment] =useState("")
    const [refresh, setRefresh] = useState(false)
    const [isLoading,setIsLoading]=useState(true)

    const navigate=useNavigate()

    useEffect(()=>{
        
        axios.get("/api/posts/"+id)
        .then(resp=>{
            setIsLoading(false)
            console.log("resp.data: ");
            console.log(resp.data);
            setPost(resp.data)
        })
        .catch(error=>{
            console.log(error);

            if(error.response.status===401){
				setTimeout(() => navigate("/"),2000)
			}
        })
    },[refresh,id, navigate,liked])

    
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
    <>
    {isLoading ? (
        <p>Loading...</p>
    )
    :
    (
        <div className='single-post'>
            <div className='single-post-left'>
                <img 
                className='single-post-img' 
                src={post.image} 
                alt="post" />
            </div>
            <div className='single-post-right'>
                <CardTop post={post} />
                <div className='comment-section'>
                    {post.comments && post.comments.map(comment=>
                        <div className='comment-wrapepr' key={comment.id}>
                            <div className='comment-photo-wrapper'>
                                {comment.user.image ?
                                <img src={comment.user.image} alt="user" />
                                :
                                <img src="https://www.svgrepo.com/show/361411/account.svg" alt="user" />

                                }
                            </div>
                            <p className='comment-author'>{comment.userName}</p>
                            <p>{comment.comment}</p>
                            
                        </div>
                    )}
                    
                </div>
                <CardActionsRow
                post={post}/>
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
       

    )}
    </>
  )
}

export default SinglePost