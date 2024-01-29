import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Forgotpassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        navigate('/resetpassword')
      } else {
        console.error('Failed to send email for password reset');
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
              <input
                type="email"
                style={{ width: '100%' }}
                placeholder="Your email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div class="button">
            <input type="submit" value="Send link" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Forgotpassword;
