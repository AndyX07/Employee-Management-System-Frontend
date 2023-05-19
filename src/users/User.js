import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./UsersApiSlice";
import {AiFillEdit} from 'react-icons/ai';

const User = ( {userId} ) => {
    const user = useSelector((state) => selectUserById(state, userId));
    console.log(user);
    const navigate = useNavigate();
    if(user){
        console.log(user);
        const handleClicked = () => {
            navigate(`${userId}`);
        }
        const userRoles = user.position.join(' ');
        const status = user.active ? 'Active' : 'Inactive';
        const username = user.username;
        return (
            <tr>
                <td>{username}</td>
                <td>{userRoles}</td>
                <td>{status}</td>
                <td><AiFillEdit onClick = {handleClicked}
                onMouseOver = {({target})=>target.style.color="grey"}
                onMouseOut = {({target})=>target.style.color="black"}
                /></td>
            </tr>
        )
    }
    else{
        return null;
    }
}

export default User;