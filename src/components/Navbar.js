import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import {AiOutlineClose} from 'react-icons/ai';
import {FaBars} from 'react-icons/fa';
import useAuth from '../hooks/useAuth'
import { useGetUsersQuery } from "../users/UsersApiSlice"
import { useUpdateUserMutation } from "../users/UsersApiSlice"
import { useSelector } from 'react-redux';
import { selectUserById } from '../users/UsersApiSlice';
import {BiLogOut} from 'react-icons/bi';

const Navbar = () => {
  const [updateUser] = useUpdateUserMutation();
  const {
    data: users,
    isLoading:isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error:userError,
} = useGetUsersQuery();
  const [sendLogout, {isLoading, isSuccess, isError, error}] = useSendLogoutMutation()
  const {username, isManager, isAdmin} = useAuth();
  const navigate = useNavigate()
  return (
    <div>
      <input type="checkbox" name = "" id="chk" className = "navbar-input"/>
        <label htmlFor="check" for = "chk" className="show-btn">
          <FaBars size = "50px" color = "white"/>
        </label>
        <label htmlFor="check" for = "chk" className="hide-btn">
          <AiOutlineClose size = "50px" color = "white"/>
      </label>
      <div className = "header">
        <img src = {require('../images/logo.png')}/>
      </div>
      <div className = "navbar">
        <ul>
          <li><Link to="/dashboard">Home</Link> </li>
          <li><Link to="/dashboard/users">Employees</Link></li>
          <li><Link to="/dashboard/comments">Comments</Link></li>
          <li><Link to="/dashboard/comments/new">Add Comment</Link></li>
          {isManager||isAdmin ? <li><Link to="/dashboard/users/new">Add Employee</Link></li> : null}
          <li><button onClick={() => {
            sendLogout();
            navigate('/login');
            }}>Logout</button></li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar