import { useRef } from "react";
import { useState} from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../hooks/usePersist";
import { useGetUsersQuery } from "../users/UsersApiSlice"

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading: isLoggingIn, error: loginError }] = useLoginMutation();
    const [persist, setPersist] = usePersist();

    useEffect(()=>{
        alert("Employee: username: Employee User, password: employepassword1\nManager: username: Manager User, password: managerpassword1\nAdmin: username: Admin User, password: adminuser1")
        userRef.current.focus();
    }, [])

    useEffect(()=>{
        setError('');
    }, [username, password])

    const content = (
        <div className="login">
            <div className="row">
                <p ref = {errRef}>{error}</p>
                <div className="login_form">
                    <img 
                    src={require('../images/logo1.png')} 
                    alt="logo" 
                    />
                    <h2 className="text-center">Login</h2>
                    <form onSubmit={async(e) => {
                        e.preventDefault();
                        try{
                            const {accessToken} = await login({username, password}).unwrap();
                            dispatch(setCredentials({accessToken}));
                            setUsername('');
                            setPassword('');
                            navigate('/dashboard');
                        }
                        catch(err){
                            alert(err.data.message);
                            errRef.current.focus();
                        }
                    }}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                ref={userRef}
                                autocomplete="off"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                autocomplete="off"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={!username || !password || isLoggingIn}
                            >
                                Login
                            </button>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="persist"
                                checked={persist}
                                onChange={(e) => setPersist(prev=>!prev)}
                            />
                            <label htmlFor="persist" className="form-check-label">
                                Stay Logged In
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return content
}

export default Login