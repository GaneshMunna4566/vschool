import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <Routes>
          <Route path='/' component={Landingpage}/>
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
          <Route path='/forgotpassword' component={Forgotpassword}/>
          <Route path='/resetpassword' component={ResetPassword}/>
          <Route path='/profile' component={UserProfile}/>
          <Route path='/homepage' component={Homepage}/>
          <Route path='/add-member' component={Add_member}/>
          <Route path='/classes' component={ClassList}/>
          <Route path='/enroll' component={EnrollmentsList}/>
          <Route path='/fileupload' component={FileUpload}/>
          <Route path='/createtask' component={CreateTaskForm}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
