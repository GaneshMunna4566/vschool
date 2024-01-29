import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../homepages/Navbar'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get('http://localhost:5000/get-user-profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(response);

        if (response && response.data) {
          setUserProfile(response.data);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        console.error(error.response ? error.response.data : error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div class="main_box">
      <Navbar/>
      <figure class="snip0057 blue" style={{ textAlign: 'center', left: '40%', top: '10%', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <figcaption>
          {userProfile ? (
            <div>
              <h2>{userProfile.firstname} <span>{userProfile.lastname}</span></h2>
              <p>{userProfile.email}</p>
              <p>{userProfile.phonenumber}</p>
              <p>{userProfile.gender}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </figcaption>
        <div class="image"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample3.jpg" alt="sample3" /></div>
        <div class="position">Profile page</div>
      </figure>

    </div>

  );
};

export default UserProfile;
