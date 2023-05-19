import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUpdateCommentMutation, useDeleteCommentMutation } from './CommentApiSlice'

const EditCommentForm = ({comment, users}) => {

  const navigate = useNavigate();
  const [title, setTitle] = useState(comment.title);
  const [content, setContent] = useState(comment.content);
  const [to, setTo] = useState(null);
  useEffect(
    () => {
      setTo(comment.user.id);
    },
    [comment.user.id]
  )
  const [updateComment, {
    isLoading: isUpdating,
    error: updateError,
    isSuccess: isUpdateSuccess,
  }] = useUpdateCommentMutation();
  const [deleteComment, {
    isLoading: isDeleting,
    error: deleteError,
    isSuccess: isDeleteSuccess,
  }] = useDeleteCommentMutation();
  const options = users.map((user) => {
    return(
    <option
      value = {user.id}
    >
      {user.username}
    </option>
    )
  })
  const handleSave = (e) => {
    e.preventDefault();
    console.log(to);
    updateComment({id:comment.id, title, text:content, user:to});
  }
  const handleDelete = (e) => {
    e.preventDefault();
    console.log(comment.id)
    deleteComment({id:comment.id});
  }
  const handleSelectChange = (e) => {
    setTo(e.target.value);
  }
  useEffect(
    () => {
      if(isUpdateSuccess){
        navigate('/dashboard/comments');
      }
    },
    [isUpdateSuccess, navigate]
  )
  useEffect(
    () => {
      if(isDeleteSuccess){
        navigate('/dashboard/comments');
      }
    },
    [isDeleteSuccess, navigate]
  )
  useEffect(
    () => {
      if(comment){
        setTitle(comment.title);
        setContent(comment.text);
        setTo(comment.user.id);
      }
    },
    [comment]
  )
  const canSave = Boolean(title && content && to && !isUpdating);
  const canDelete = Boolean(!isDeleting);

  return (
    <>
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea className="form-control" id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <select className="form-control" id="to" value={to} onChange={handleSelectChange}>
            {options}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={!canSave}>Save</button>
        <button type="button" className="btn btn-danger" disabled={!canDelete} onClick={handleDelete}>Delete</button>
      </form>
    </>
  )
}

export default EditCommentForm