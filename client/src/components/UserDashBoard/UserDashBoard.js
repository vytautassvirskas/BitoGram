import React from 'react'
import {Link} from "react-router-dom"


import "./UserDashBoard.css"

const UserDashBoard = (props) => {
    const {postsAmount, id, user}=props
  return (
    <div className='user-dash'>
        <div className='user-dash-image-wrapper' >
            {user.image ? (
                 <img
                 src={user.image}
                 alt="user" />
            )
            :
            (
                <img
                src="https://www.svgrepo.com/show/361411/account.svg"
                alt="user" />
            )
            }
           
        </div>
        <div className='user-dash-info'>
            <div className='user-name-settings'>
               <h2>{user.userName}</h2> 
               <Link to={"/user/edit/"+id}>Edit profile</Link>
               <img src="https://www.svgrepo.com/show/196008/settings-gear.svg" alt="settings." />
            </div>
            <div className='posts-follow-stats'>
                <p><span>{postsAmount}</span>posts</p>
                <p><span>0</span>followers</p>
                <p><span>0</span>following</p>
            </div>
            <div className='user-info'>
                <div>
                    <h3>{user.firstName+" "+user.lastName}</h3>
                    <p>{
                    user.description?
                    user.description
                    :
                    <Link to={"/user/edit/"+user.id}>Add some description...</Link>
                    }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDashBoard