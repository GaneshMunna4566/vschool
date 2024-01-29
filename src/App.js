import {BrowserRouter as Routers,Routes,Route} from "react-router-dom";
import Landingpage from "./components/auth/Landingpage";
import Signup from './components/auth/Signup';
import Login from "./components/auth/Login";
import Forgotpassword from "./components/auth/Forgotpassword";
import ResetPassword from "./components/auth/ResetPassword";
import UserProfile from "./components/auth/UserProfile";

import Homepage from "./components/homepages/Homepage";
import Add_member from "./components/homepages/Add_member";
import ClassList from "./components/homepages/ClassList";
import EnrollmentsList from "./components/homepages/EnrollmentsList";
import FileUpload from "./components/homepages/FileUpload ";
import CreateTaskForm from "./components/homepages/CreateTaskForm";

function App() {
  return (
    <div className="App">
      <Routers>
        <Routes>
          <Route path='/' Component={Landingpage}/>
          <Route path='/signup' Component={Signup}/>
          <Route path='/login' Component={Login}/>
          <Route path='/forgotpassword' Component={Forgotpassword}/>
          <Route path='/resetpassword' Component={ResetPassword}/>
          <Route path='/profile' Component={UserProfile}/>
          <Route path='/homepage' Component={Homepage}/>
          <Route path='/add-member' Component={Add_member}/>
          <Route path='/classes' Component={ClassList}/>
          <Route path='/enroll' Component={EnrollmentsList}/>
          <Route path='/fileupload' Component={FileUpload}/>
          <Route path='/createtask' Component={CreateTaskForm}/>
        </Routes>
      </Routers>
    </div>
  );
}

export default App;
