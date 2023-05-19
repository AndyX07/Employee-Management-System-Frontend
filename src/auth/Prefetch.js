import { Store } from "../app/Store";
import { commentsApiSlice } from "../comments/CommentApiSlice";
import {UsersApiSlice} from '../users/UsersApiSlice'
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import React from 'react'

const Prefetch = () => {
    useEffect(
        () => {
            const comment = Store.dispatch(commentsApiSlice.endpoints.getComments.initiate())
            const user = Store.dispatch(UsersApiSlice.endpoints.getUsers.initiate())
            return () => {
                comment.unsubscribe();
                user.unsubscribe();
            }
        }, []
    )
  return (
    <Outlet/>
  )
}

export default Prefetch