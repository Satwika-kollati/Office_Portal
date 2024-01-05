import { useState } from 'react';
import { useLogout } from './UseLogout';
import { Navigate } from 'react-router-dom';
import { UseAuthContext } from './UseAuthContext';


export const UseDeleteProfile = (onDeleteSuccess, onDeleteError) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {logout} = useLogout()
  const {token,logoutSuccess} = UseAuthContext()

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const openPasswordPrompt = () => {
    setIsPasswordPromptOpen(true);
  };

  const closePasswordPrompt = () => {
    setIsPasswordPromptOpen(false);
    setError(''); 
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmDelete = async () => {
    
    try {
      const response = await fetch('/api/profile/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete profile');
      }

      logout()
      logoutSuccess()
      Navigate('/login');
      onDeleteSuccess();
    } catch (err) {
      setError(err.message || 'Internal Server Error');
      onDeleteError();
    }
  };

  return {
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
  };
};

