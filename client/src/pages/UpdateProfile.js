import React, { useState, useEffect } from 'react';
import { UseAuthContext } from '../hooks/UseAuthContext';
import { Link,useNavigate} from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate(); 
  const { user_id,token } = UseAuthContext();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    officerName: '',
    dateOfBirth: '',
    yearOfJoin: '',
    jobTitle: '',
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const userData = await response.json();

        setFormData({
          email: userData.email,
          username: userData.username,
          officerName: userData.officerName,
          dateOfBirth: userData.dateOfBirth,
          yearOfJoin: userData.yearOfJoin,
          jobTitle: userData.jobTitle,
        });
      } catch (error) {
        console.error(error);
        setError(error.message || 'Failed to update profile');
      }
    };

    fetchProfileData();
  }, [user_id,token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccessPopupClose = () => {
    setShowSuccessPopup(false);
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      setShowSuccessPopup(true);
      setTimeout(() => {
        handleSuccessPopupClose();
        navigate('/profile'); 
      }, 3000);
    } catch (error) {
      setError(error.message || 'Internal Server Error');
    }
  };

  return (
    <div className="update-profile-form">
      <h2>Update Profile</h2>
      <form  onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} disabled />
        
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />

        <label>Officer Name:</label>
        <input type="text" name="officerName" value={formData.officerName} onChange={handleChange} />

        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : ''} onChange={handleChange} />

        <label>Year of Join:</label>
        <input type="text" name="yearOfJoin" value={formData.yearOfJoin} onChange={handleChange} />

        <label>Job Title:</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />

        <button type="submit">Update Profile</button>
        <Link to="/profile">
        <button className="goback-button">Go Back</button>
        </Link>
        {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
        )}
      </form>
      

      {showSuccessPopup && (
        <div className="success-popup">
          <p>Update Successful!</p>
          <button onClick={handleSuccessPopupClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
