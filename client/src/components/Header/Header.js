import React,{useContext, useState} from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'

import MainContext from '../../context/MainContext'
import SearchedUser from '../SearchedUser/SearchedUser'
import "./Header.css"

const Header = () => {
  const {userInfo} = useContext(MainContext)
  const [searchedUsers,setSearchedUsers]=useState([])
  const [isSearched,setIsSearched]=useState(false)
  

  console.log(searchedUsers)
  const handleSearch = (e) => {
    // if(e.target.value==="") return setSearchedUsers([])

    axios.get("/api/users/search/"+e.target.value)
    .then(resp=>{
      setIsSearched(true)
      setSearchedUsers(resp.data)
      console.log(resp.data);
    })
    .catch(error=>{
      console.log(error);
    })

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
            <Link to={"/user/"+userInfo.id} className='nav-link'>
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
      <div className='searched-users-container'>
        {searchedUsers ? searchedUsers.map(user=>
           <
            SearchedUser 
            key={user.id} 
            user={user}
          />
        ): <p className='no-results-search'>No results found.</p>}
      
      </div>
    </header>
  )
}

export default Header