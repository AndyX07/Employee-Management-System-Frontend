import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () =>{
    const token = useSelector(selectCurrentToken);
    let isManager = false;
    let isAdmin = false;
    let status = "Employee";
    if(token){
        const decoded = jwtDecode(token);
        const {position, username} = decoded.UserInfo;
        isManager = position.includes('Manager');
        isAdmin = position.includes('Admin');
        if(isManager){
            status = "Manager";
        }
        if(isAdmin){
            status = "Admin";
        }
        return {username, position, isManager, isAdmin, status}
    }
    return {username: '', position: [], isManager, isAdmin, status}
}

export default useAuth;