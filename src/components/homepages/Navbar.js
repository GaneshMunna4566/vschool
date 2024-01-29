import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login')
  };

  return (
    <div>
      <input type="checkbox" id="check" />
      <label htmlFor="check">
        <i className="fas fa-bars" id="btn"></i>
        <i className="fas fa-times" id="cancel"></i>
      </label>
      <div className="sidebar">
        <header>Volunteer School</header>
        <a href="/homepage" className="active">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </a>
        <a href="/add-member">
          <i className="fas fa-plus"></i>
          <span>Add member</span>
        </a>
        <a href="/classes">
          <i className="fas fa-book"></i>
          <span>Classes</span>
        </a>
        <a href="/enroll">
          <i className="fa-solid fa-book-open"></i>
          <span>Enroll</span>
        </a>
        <a href="/profile">
          <i className="far fa-user"></i>
          <span>Profile</span>
        </a>
        <a href="/fileupload">
          <i className="far fa-folder"></i>
          <span>Files</span>
        </a>
        <a href="#">
          <i className="fa fa-cog" aria-hidden="true"></i>
          <span>Setting</span>
        </a>
        <a href="/createtask">
          <i className="fa fa-quora" aria-hidden="true"></i>
          <span>Tasks</span>
        </a>
        <a href="#" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}

export default Navbar;
