import {Routes, Route} from 'react-router-dom';
import Layout from './components/Layout';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import Public from './components/Public';
import Welcome from './components/Welcome';
import CommentList from './comments/CommentList';
import UserList from './users/UserList';
import EditUser from './users/EditUser';
import NewUserForm from './users/NewUserForm';
import EditComments from './comments/EditComments';
import NewComment from './comments/NewComment';
import Prefetch from './auth/Prefetch';
import PersistLogin from './auth/PersistLogin';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <Routes>
      <Route path = "/" element = {<Layout/>}>
        <Route index element = {<Public/>}  />
        <Route path = "login" element = {<Login/>}  /> 
        <Route element = {<PersistLogin/>}>
          <Route element = {<Prefetch/>}>
          <Route element = {<DashboardLayout/>}>
            <Route path = "dashboard" element = {<Dashboard/>}>
              <Route index element = {<Welcome/>}  />
              <Route path = "comments">
                <Route index element = {<CommentList/>}/>
                <Route path = ":id" element = {<EditComments/>}/>
                <Route path = "new" element = {<NewComment/>}/>
              </Route>
              <Route path = "users">
                <Route index element = {<UserList/>}/>
                <Route path = ":id" element = {<EditUser/>}/>
                <Route path = "new" element = {<NewUserForm/>}/>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
