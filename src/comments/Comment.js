import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { selectCommentById } from './CommentApiSlice';
import { selectUserById } from '../users/UsersApiSlice'
import {AiFillEdit} from 'react-icons/ai';

const Comment = ({commentId}) => {
    const com = useSelector((state) => selectCommentById(state, commentId));
    console.log(commentId);
    const navigate = useNavigate();
    const onCommentClick = () => {
        navigate(`${commentId}`);
    }
    if(com){
        console.log(com);
        //console.log(com[0].createdAt);
        const createdTime = new Date(com.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        const updatedTime = new Date(com.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' });
        return (
            <div className = "comment">
                <h2>{com.title}</h2>
                <h4>{com.username}</h4>
                <p>Created at: {createdTime}</p>
                <p>Updated at: {updatedTime}</p>
                <p>{com.text}</p>
                <td><AiFillEdit onClick = {onCommentClick}
                onMouseOver = {({target})=>target.style.color="grey"}
                onMouseOut = {({target})=>target.style.color="black"}
                /></td>
            </div>
        )
    }
    else{
        return null;
    }
}

export default Comment;