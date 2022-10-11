import React from 'react'
import {Link} from "react-router-dom"

import "./SearchedUser.css"

const SearchedUser = (props) => {
    const{user}=props
  return (
        <Link className='searched-user-wrapper' to={'/user/'+user.id}>
            <div>
                {user.image 
                ?
                <img 
                    className='card-img' 
                    src={user.image}
                    alt="user" />
                    :
                    <img src="https://www.svgrepo.com/show/361411/account.svg" alt="user" />
                }
            </div>
            <div>
                <p>{user.userName}</p>
                <p>{user.firstName+" "+user.lastName}</p>
            </div>
        </Link>
  )
}

export default SearchedUser