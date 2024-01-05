import { useState } from 'react'
import { UseAuthContext } from "./UseAuthContext"
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { loginSuccess} = UseAuthContext()
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
         
      if (response.ok) {
        const { userType,username,user_id,token } = await response.json()
        localStorage.setItem('user', JSON.stringify({userType:userType, token:token, username:username, user_id : user_id }))
        loginSuccess(token,user_id,username,userType)
        navigate('/')
      } 
      else {
        setError('Invalid credentials. Please try again.')
      }
    } 
    catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again.');
    } 
    finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error }
}
