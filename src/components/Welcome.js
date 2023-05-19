import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const Welcome = () => {

    const {username, isManager, isAdmin} = useAuth();
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [sendLogout, {isLoading, isSuccess, isError, error}] = useSendLogoutMutation()
    const date = new Date();
    const formatDDMMYYYY = date.toLocaleDateString('en-GB');
    useEffect(() => {
        if(isSuccess){
            navigate('/login');
        }
    }, [isSuccess, navigate])
  return (
    <div>
        <h1>Welcome {username}</h1>
        <p>Today's date is {formatDDMMYYYY}</p>
        <p>Click <Link to="/dashboard/users">here</Link> to go to the employees page</p>
        <p>Click <Link to="/dashboard/comments">here</Link> view all comments</p>
        <p>Click <Link to="/dashboard/comments/new">here</Link> to add a new comment</p>
        {(isManager||isAdmin) ? <p>Click <Link to="/dashboard/users/new">here</Link> to add a new employee</p> : null}
    </div>
  )
}

export default Welcome