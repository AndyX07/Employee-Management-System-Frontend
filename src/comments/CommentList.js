import React from 'react'
import { useGetCommentsQuery } from './CommentApiSlice'
import Comment from './Comment'
import useAuth from '../hooks/useAuth'

const CommentList = () => {

    const {username, isManager, isAdmin} = useAuth();

    const{
        data: comment,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetCommentsQuery('commentList', {
        pollingInterval: 30000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })
    if(isSuccess){
        const {ids} = comment;
        const content = (
            <div>
                {ids.map((commentId) => (
                    <Comment key = {commentId} commentId = {commentId}/>
                ))}
            </div>
        )
        return content;
    }
  return (
    <div>
        {isLoading? <div>Loading...</div> : null}
    </div>
  )
}

export default CommentList