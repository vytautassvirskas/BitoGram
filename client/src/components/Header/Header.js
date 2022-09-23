import React from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'


import "./Header.css"

const Header = () => {

  const handleSearch = (e) => {
    console.log(e.target.value)
    axios.get("/api/users/search/"+e.target.value)

  }

  return (
    <header className='header'>
      <Link to="/explore" className='nav-link'>
        <h1 className='header-logo'>Bitogram</h1>
      </Link>
          <form>
            <input
            className='search-bar' 
            type="text" 
            onChange={(e)=>handleSearch(e)} 
            />
          </form>
      <nav className='nav'>
        <ul className='navbar'>
          <li className='nav-item'>
            <Link to="/user/new" className='nav-link'>
              <img 
              className='nav-img' 
              src='https://www.svgrepo.com/show/333478/add-r.svg' 
              alt="upload-logo"
              >
              </img>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to="/user/posts" className='nav-link'>
              <img 
              className='nav-img' 
              src='https://www.svgrepo.com/show/20/user.svg' 
              alt="user-logo"
              >
              </img>
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
            </Link>
          </li>
        </ul>



      </nav>
    </header>
  )
}

export default Header