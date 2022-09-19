import React, {useContext} from 'react'
import {Link} from "react-router-dom"

import MainContext from '../../context/MainContext'

import "./Header.css"

const Header = () => {
  const {loggedIn,userInfo } =useContext(MainContext)

  console.log(userInfo)
  return (
    <header className='header'>
      <h1 className='header-logo'>Bitogram</h1>
      <nav className='nav'>
        <ul className='navbar'>
          <li className='nav-item'>
            <Link>
              <img></img>
              <p>{userInfo.firstName?userInfo.firstName+" profile":"Account profile"}</p>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/logout" className='nav-link'>Atsijungti</Link>
          </li>
        </ul>



      </nav>
    </header>
  )
}

export default Header