import React,{useContext} from 'react'
import {Link} from "react-router-dom"

import MainContext from '../../context/MainContext'
import "./UserDashBoard.css"

const UserDashBoard = (props) => {
    const{userInfo}=useContext(MainContext)
    const {userId, userName, firstName, lastName,postsAmount,description}=props
  return (
    <div className='user-dash'>
        <div className='user-dash-image-wrapper' >
            {userInfo.image ? (
                 <img
                 src={userInfo.image}
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
               <h2>{userName}</h2> 
               <Link to={"/user/edit/"+userId}>Edit profile</Link>
               <img src="https://www.svgrepo.com/show/196008/settings-gear.svg" alt="settings." />
            </div>
            <div className='posts-follow-stats'>
                <p><span>{postsAmount}</span>posts</p>
                <p><span>0</span>followers</p>
                <p><span>0</span>following</p>
            </div>
            <div className='user-info'>
                <div>
                    <h3>{firstName+" "+lastName}</h3>
                    <p>{
                    description?
                    description
                    :
                    <Link to={"/user/edit/"+userId}>Add some description...</Link>
                    }</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserDashBoard