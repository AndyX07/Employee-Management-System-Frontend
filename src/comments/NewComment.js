import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/UsersApiSlice'
import NewCommentForm from './NewCommentForm'

const NewComment = () => {
  const users = useSelector(selectAllUsers)
  const content = users ? (
    <NewCommentForm users={users}/>
  ) : (
    <p>Loading...</p>
  )
  return (
    content
  )
}

export default NewComment