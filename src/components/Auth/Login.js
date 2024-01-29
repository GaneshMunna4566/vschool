import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setToken(null);
    setUserData(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;
        localStorage.setItem('authToken', authToken);
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
          setUserData(data.user);
        }
        setToken(authToken);
        navigate('/homepage')
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication', error);
    }
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }
  }, []);
  return (
    <div class="container" style={{marginTop:'50px'}}>
      <div class="title">Login</div>
      <div class="content">
        <form onSubmit={handleSubmit}>
          <div class="user-details">
            
            <div class="input-box">
              <span class="details">Email</span>
              <input type="email" placeholder="Enter email" name="email" value={formData.email}
                onChange={handleChange} required/>
            </div>
            
            <div class="input-box">
              <span class="details">Password</span>
              <input type="password" placeholder="Password" name="password" value={formData.password}
                onChange={handleChange}required/>
            </div>
          </div>
          <div class="button">
            <input type="submit" value="Login" />
          </div>
          <a href="/forgotpassword" class="forgot">Forgot password?</a>
        </form>
      </div >
    </div>
    
  );
}

export default Login;
