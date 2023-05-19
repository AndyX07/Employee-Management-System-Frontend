import React from 'react'
import {useAddCommentMutation} from './CommentApiSlice'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'

const NewCommentForm = ({users}) => {
    const [addNewComment, {
        isLoading,
        error,
        isSuccess,
    }] = useAddCommentMutation()
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [to, setTo] = useState(users[0]?.id);
    const options = users?.map((user) => {
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
        addNewComment({title, text:content, user:to});
    }
    const handleSelectChange = (e) => {
        setTo(e.target.value);
    }
    useEffect(
        () => {
            if(isSuccess){
                navigate('/dashboard/comments');
            }
        },
        [isSuccess, navigate]
    )
    const canSave = Boolean(title && content && to && !isLoading);
  return (
    <>
        <h1>New Comment</h1>
        <form onSubmit={handleSave} className = "newComment">
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
        </form>
    </>
  )
}

export default NewCommentForm