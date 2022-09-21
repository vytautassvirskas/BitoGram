import React from 'react'
import {Link} from "react-router-dom"

import "./UserDashBoard.css"

const UserDashBoard = (props) => {
    const {userId, userName, firstName, lastName}=props
  return (
    <div className='user-dash'>
        <div className='user-dash-image-wrapper' >
            <img
            className='user-dash-image'
            src="https://www.svgrepo.com/show/361411/account.svg"
            alt="user" />
        </div>
        <div className='user-dash-info'>
            <div className='user-name-settings'>
               <h2>{userName}</h2> 
               <Link to={"/user/edit/"+userId}>Edit profile</Link>
               <img src="https://www.svgrepo.com/show/196008/settings-gear.svg" alt="settings." />
            </div>
            <div className='posts-follow-stats'>
                <p><span>0</span>posts</p>
                <p><span>0</span>followers</p>
                <p><span>0</span>following</p>
            </div>
            <div className='user-info'>
                <h3>{firstName+" "+lastName}</h3>
                <p>Add description about you in settings</p>

            </div>
        </div>
    </div>
  )
}

export default UserDashBoard