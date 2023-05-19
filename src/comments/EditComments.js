import React from 'react'
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCommentById } from './CommentApiSlice';
import { selectAllUsers } from '../users/UsersApiSlice';
import EditCommentForm from './EditCommentForm';

const EditComments = () => {
    const {id} = useParams();
    const comment = useSelector((state) => selectCommentById(state, id));
    const users = useSelector(selectAllUsers);
    const content = comment ? (
        <EditCommentForm comment={comment} users={users}/>
    ) : (
        <p>Loading...</p>
    )
  return (
    content
  )
}

export default EditComments