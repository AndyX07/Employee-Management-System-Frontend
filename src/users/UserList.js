import React from 'react'
import {useGetUsersQuery} from './UsersApiSlice'
import User from './User'

const UserList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    }
    = useGetUsersQuery(null, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    if(isError){
        return (<p>{error?.data?.message}</p>)
    }
    if(isSuccess){
        console.log(users.ids);
    }
  return (
    <div className = "userlist">
        {isLoading? <div>Loading...</div> : null}
        {isSuccess? 
            <table className = "userlist-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {isSuccess? users.ids.map((userId) => (
                <User userId = {userId}/>
            )) : null}
            </tbody>
            </table>
        : null}
    </div>
  )
}

export default UserList