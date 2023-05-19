import React from 'react'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from './UsersApiSlice';
import {ROLES} from '../config/roles';

const NAME_REGEX = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NewUserForm = () => {
    const [addNewUser, { isSuccess, error, isLoading }] = useCreateUserMutation();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [nameError, setNameError] = useState('');
    const [roles, setRoles] = useState([]);
    useEffect(()=>{
        setValidName(NAME_REGEX.test(name));
    }, [name]);
    useEffect(()=>{
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);
    useEffect(
        () => {
            if(isSuccess){
                navigate('/dashboard/users');
            }
        },
        [isSuccess, navigate]
    )

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

    const canSave = Boolean(validName && validPassword && roles.length > 0 && !isLoading);

    const handleSave = async(e) => {
        e.preventDefault();
        if(canSave){
            addNewUser({username:name, password, position: roles});
        }
    }

    const options = Object.values(ROLES).map((role) => {
        return (
            <option value={role}>{role}</option>
        )
    });

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
    <form onSubmit = {handleSave} className = "newUser">
        <h1>New User</h1>
        <div className = "form-control">
            <label htmlFor="name">Name (firstname lastname)</label>
            <input
                className = {validateUser()}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameChange}
            />
            <label htmlFor = "password">Password (8 characters and must contain one letter and digit)</label>
            <input
                className = {validatePassword()}
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
            />
            <label htmlFor = "roles">Roles</label>
            <select
                id="roles"
                name="roles"
                multiple={true}
                onChange={onRoleChange}
            >   
                {options}
            </select>
            <button type="submit" disabled={!canSave}>
                {isLoading ? 'Saving...' : 'Save'}
            </button>
            {error && <div className="error">{JSON.stringify(error)}</div>}
        </div>
    </form>
  )
}

export default NewUserForm