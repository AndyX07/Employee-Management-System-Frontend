import React from 'react'
import {useState, useEffect} from 'react'
import { useUpdateUserMutation, useDeleteUserMutation } from './UsersApiSlice'
import {useNavigate} from 'react-router-dom'
import {ROLES} from '../config/roles'

const NAME_REGEX = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const EditUserForm = ({user}) => {
    console.log("edit");
    const [updateUser, { isSuccess, error, isLoading }] = useUpdateUserMutation();
    const [deleteUser, {isSuccess: isDeleteSuccess, error: deleteError, isLoading: isDeleteLoading}] = useDeleteUserMutation();
    const navigate = useNavigate();
    const [name, setName] = useState(user.usename);
    const [validName, setValidName] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [roles, setRoles] = useState(user.positions);
    useEffect(()=>{
        setValidName(NAME_REGEX.test(name));
    }, [name]);
    useEffect(()=>{
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(
        () => {
            if(isSuccess){
                setName('');
                setPassword('');
                setRoles([]);   
                navigate('/dashboard/users');
            }
        },
        [isSuccess, navigate]
    )
    useEffect(
        () => {
            if(isDeleteSuccess){
                setName('');
                setPassword('');
                setRoles([]);   
                navigate('/dashboard/users');
            }
        }, [isDeleteSuccess, navigate])
    
    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const onRoleChange = (e) => {
        const roles = Array.from(e.target.selectedOptions, option => option.value);
        setRoles(roles);
    }
    const handleSave = async(e) => {
        console.log("save");
        e.preventDefault();
        if(password){
            updateUser({id: user.id, username:name, password, position:roles, active:true});
        }
        else{
            updateUser({id: user.id, username:name, position:roles, active: true});
        }
    }
    const handleDelete = async(e) => {
        e.preventDefault();
        deleteUser({id:user.id});
    }
    let canSave;
    if(password){
        canSave = Boolean(validName && validPassword && roles?.length > 0 && !isLoading);
    }
    else{
        canSave = Boolean(validName && roles?.length > 0 && !isLoading);
    }
    const validateUser = () => {
        if(!validName){
            return "incomplete-form";
        }
        else{
            return "";
        }
    }

    const validatePassword = () => {
        if(!validPassword){
            return "incomplete-form";
        }
        else{
            return "";
        }
    }

  return (
    <>
        <form onSubmit = {handleSave}>
            <h1>Edit User</h1>
            <div className="form-group">
                <label htmlFor="name">Name (firstname lastname)</label>
                <input type="text" className={validateUser()} id="name" value={name} onChange={handleNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password (8 characters and must contain one letter and digit)</label>
                <input type="password" className={validatePassword()} id="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div className="form-group">
                <label htmlFor="roles">Roles</label>
                <select multiple className="form-control" id="roles" value={roles} onChange={onRoleChange}>
                    {Object.values(ROLES).map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            <button type="submit" disabled={!canSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </form>
        {error && <p>{JSON.stringify(error)}</p>}
    </>
  )
}

export default EditUserForm