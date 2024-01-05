import React, { useState, useEffect } from 'react';
import { UseAuthContext } from '../hooks/UseAuthContext';
import { UseDeleteProfile} from '../hooks/UseDeleteProfile'
import { Link } from 'react-router-dom';

const Profile = () => {
  const {token} = UseAuthContext();
  const [userDetails, setUserDetails] = useState(null);
  const [Error, setError] = useState('');

  const handleDeleteSuccess = () => {
    console.log('Profile deleted successfully');
  };

  const handleDeleteError = () => {
    console.error('Error deleting profile');
  };

  const {
    isConfirmationOpen,
    openConfirmation,
    closeConfirmation,
    isPasswordPromptOpen,
    openPasswordPrompt,
    closePasswordPrompt,
    password,
    handlePasswordChange,
    handleConfirmDelete,
    error,
  } = UseDeleteProfile(handleDeleteSuccess,handleDeleteError);

 

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUserDetails(userData);
        } else {
          setError('Error fetching user profile'); 
          console.error('Error fetching user profile:', response.status);
        }
      } catch (error) {
        setError('Error fetching user profile'); 
        console.error('Error fetching user profile:', error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  return (
    <div className="profile-card">
      <h2>Profile</h2>
      <div className="profile-details">
      {userDetails && (
      <div>
      <p><strong>Email:</strong> <span>{userDetails.email}</span></p>
      <p><strong>Username:</strong> <span>{userDetails.username}</span></p>
      <p><strong>Officer Name:</strong> <span>{userDetails.officerName}</span></p>
      <p><strong>Date of Birth:</strong> <span>{new Date(userDetails.dateOfBirth).toLocaleDateString('en-GB').split('/').join('-')}</span></p>
      <p><strong>Year of Join:</strong> <span>{userDetails.yearOfJoin}</span></p>
      <p><strong>Job Title:</strong> <span>{userDetails.jobTitle}</span></p>
      </div>
      )}
      </div>

      <Link to="/update-profile">
        <button className="update-profile-button">Update Profile</button>
      </Link>

      <button className="delete-button" onClick={openConfirmation}>Delete Profile</button>

      {isConfirmationOpen && (
        <div className="overlay">
        <div className="confirmation-popup">
          <p>Are you sure you want to delete your profile?</p>
          <button onClick={openPasswordPrompt}>Yes</button>
          <button onClick={closeConfirmation}>No</button>
        </div>
        </div>
      )}

      {isPasswordPromptOpen && (
        <div className="overlay">
        <div className="password-prompt-popup">
          <p>Enter your password for confirmation:</p>
          <input placeholder='Password' className='password-input' type="password" value={password} onChange={handlePasswordChange} />
          <button onClick={handleConfirmDelete}>Confirm</button>
          <button onClick={closePasswordPrompt}>Go Back</button>
          {error && <p className="error-message">{error}</p>}
          {Error && <p className="error-message">{Error}</p>}
        </div>
        </div>
      )}
    </div>
  )
};

export default Profile;
