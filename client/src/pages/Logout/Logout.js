import React,{useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import MainContext from '../../context/MainContext'

const Logout = () => {
  const { setAlert, setLoggedIn, setUserInfo } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
		axios.get('/api/users/logout', {
				withCredentials: true
			})
		.then((resp) => {
			setLoggedIn(false);
			setUserInfo({})
      console.log(resp.data);
			setAlert({
				message: resp.data,
				status: 'success'
		  });
		
			navigate('/');
			
		})
		.catch((error) => {
			console.log(error);
			setAlert({
				message: error.response.data,
				status: 'danger'
			});
			navigate('/');
			
		});
		},
		[navigate,setAlert,setLoggedIn,setUserInfo]
	);
  
  return (
    <></>
  )
}

export default Logout