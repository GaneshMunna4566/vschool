import React, { useState } from 'react';
import '../../assets/css/landing.css'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    email: '',
    phonenumber: '',
    relationship: '',
    dateofbirth: '',
    password: '',
    c_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        navigate('/login')
      } else {
        const error = await response.json();
        alert(error.err);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div class="container">
      <div class="title">Registration</div>
      <div class="content">
        <form onSubmit={handleSubmit}>
          <div class="user-details">
            <div class="input-box">
              <span class="details">First Name</span>
              <input type="text" name="firstname" id="firstname" className='left' placeholder='Enter Your Firstname' value={formData.firstname}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Middle Name</span>
              <input type="text" name="middlename" id="middlename" className='right' placeholder='Enter Your Middlename' value={formData.middlename}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Last Name</span>
              <input type="text" name="lastname" id="lastname" className='left' placeholder='Enter Your Lastname' value={formData.lastname}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Phone Number</span>
              <input type="number" name="phonenumber" id="phonenumber" className='right' placeholder='Enter Your Phonenumber' value={formData.phonenumber}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input type="email" name="email" id="email" className='left' placeholder='Enter Your Email' value={formData.email}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Relationship</span>
              <input type="text" name="relationship" id="relationship" className='left' placeholder='Relationship' value={formData.relationship}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Date of birth</span>
              <input type="date" name="dateofbirth" id="dateofbirth" className='right' placeholder='Enter Date of birth' value={formData.dateofbirth}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Gender</span>
              <input type="text" name="gender" id="gender" className='right' placeholder='Enter Date of birth' value={formData.gender}
                onChange={handleChange} />
            </div>
            {/* <div class="gender-details">
              <input type="radio" name="gender" id="dot-1" />
              <input type="radio" name="gender" id="dot-2" value={formData.gender}
                onChange={handleChange} />
              <input type="radio" name="gender" id="dot-3" value={formData.gender}
                onChange={handleChange} />
              <span class="gender-title">Gender</span>
              <div class="category">
                <label for="dot-1">
                  <span class="dot one"></span>
                  <span class="gender">Male</span>
                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                <label for="dot-2">
                  <span class="dot two"></span>
                  <span class="gender">Female</span>
                </label>
              </div>
            </div> */}
            <div class="input-box">
              <span class="details">Password</span>
              <input type="password" name="password" id="password" className='left' placeholder='Enter Your Password' value={formData.password}
                onChange={handleChange} />
            </div>
            <div class="input-box">
              <span class="details">Confirm Password</span>
              <input type="password" name="c_password" id="c_password" className='right' placeholder='Enter Confirm_password' />
            </div>
          </div>
          <div class="button">
            <input type="submit" value="Register" />
          </div>
          <p>Already a member?
          <a href="/login" class="forgot">Login</a>
          </p>
        </form>
      </div >
    </div>
  )
}

export default Signup