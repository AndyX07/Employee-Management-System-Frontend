import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"

const PersistLogin = () => {
    const [persist] = usePersist();
    const token = useSelector(selectCurrentToken);
    const effectRan = useRef(false);
    const [trueSuccess, setTrueSuccess] = useState(false);
    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation();
    useEffect(
        () => {
            if(effectRan.current === true || process.env.NODE_ENV!=='development'){
                console.log('effect ran')
                const verify = async() => {
                    try{
                        await refresh();
                        setTrueSuccess(true);
                    }
                    catch(err){
                        console.log(err);
                    }
                }
                if(!token && persist){
                    verify();
                }
            }
            return ()=>{
                effectRan.current = true;
            }
        }, []
    )
    let content;
    if(!persist){
        content = <Outlet />
    }
    else if(isLoading){
        content = <div>Loading...</div>
    }
    else if(isError){
        content = <div><p>{error.message}</p> 
            <Link to = "/login">Please Login Again</Link>
        </div>
    }
    else if(isSuccess && trueSuccess){
        content = <Outlet />
    }
    else if(token && isUninitialized){
        content = <Outlet/>
    }
    else{
        content = <div><p>unauthorized</p> 
            <Link to = "/login">Please Login Again</Link>
        </div>
    }
    return content;
}

export default PersistLogin;
