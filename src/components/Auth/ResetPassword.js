import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetOtpChange = (e) => {
    setResetOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reset_otp: resetOtp, new_password: newPassword }),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
        navigate('/login')
      } else {
        const errorResult = await response.json();
        setMessage(errorResult.message);
      }
    } catch (error) {
      console.error('Error during password reset:', error);
    }
  };

  return (
    <div class="container">
    <div class="title">Forgot Password</div>
    <div class="content">
      <form onSubmit={handleSubmit}>
        <div class="user-details">
          
          <div class="input-box">
            <span class="details">Email</span>
            <input type="email" placeholder="Enter email" name="email" value={email}
            onChange={handleEmailChange} required />
          </div>
          <div class="input-box">
            <span class="details">Enter Otp</span>
            <input type="text" placeholder="Enter Otp" name="resetOtp" value={resetOtp}
            onChange={handleResetOtpChange} required />
          </div>
          <div class="input-box">
            <span class="details">Password</span>
            <input type="password" placeholder="Enter Password" name="newPassword" value={newPassword}
            onChange={handleNewPasswordChange} required />
          </div>
          <div class="input-box">
            <span class="details">Confirm Password</span>
            <input type="password" placeholder="Confirm Password" name="c_password" required />
          </div>
        </div>
        <div class="button">
          <input type="submit" value="update Password" />
        </div>
      </form>
    </div >
  </div>
  );
}

export default ResetPassword;
