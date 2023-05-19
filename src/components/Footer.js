import React from 'react'
import {useNavigate, useLocation} from 'react-router-dom';
import {AiOutlineHome} from 'react-icons/ai';
import useAuth from '../hooks/useAuth';

const Footer = () => {

    const {username, status} = useAuth();

    const navigate = useNavigate();
    const {pathname} = useLocation();
    const onHomeClick = () =>{
        navigate('/dashboard');
    }
  return (
    <footer>
      <p>User: {username}</p>
      <p>Position: {status}</p>
    </footer>
  )
}

export default Footer