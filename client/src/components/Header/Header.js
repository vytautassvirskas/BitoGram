import React, {useContext} from 'react'
import {Link} from "react-router-dom"

import MainContext from '../../context/MainContext'

import "./Header.css"

const Header = () => {
  const {userInfo } =useContext(MainContext)

  console.log(userInfo)
  return (
    <header className='header'>
      <Link className='nav-link'>
        <h1 className='header-logo'>Bitogram</h1>
      </Link>
      <nav className='nav'>
        <ul className='navbar'>
          <li className='nav-item'>
            <Link to="/explorer" className='nav-link'>
              <img 
              className='nav-img' 
              src='https://www.svgrepo.com/show/20/user.svg' 
              alt="user-logo"
              >
              </img>
              <p>{userInfo.firstName?userInfo.firstName+" profile":"Account profile"}</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link 
            to="/logout" 
            className='nav-link'
            >
              <img 
              className='nav-img' 
              src='https://www.svgrepo.com/show/56164/logout.svg' 
              alt='exit-logo'
              >
              </img>
              Atsijungti
            </Link>
          </li>
        </ul>



      </nav>
    </header>
  )
}

export default Header