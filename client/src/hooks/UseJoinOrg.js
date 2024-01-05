import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from "react-router-dom"

    
export const UseJoinOrg = () => {
  const { loginSuccess } = useContext(AuthContext)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const joinOrg = async (userData) => {
    try {

      setisLoading(true)
      setError(null)

      const response = await fetch('/api/auth/signup-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })
      const json = await response.json()
      
      if(response.ok){
        const { userType,username,user_id,token } = json
        localStorage.setItem('user', JSON.stringify({ userType,token,username,user_id }))
        loginSuccess(userType,token,username,user_id)
        navigate('/')
      }
      else{   
        setisLoading(false)
        setError(json.error)
      }
      
    } catch (err) {
      console.error('Signup failed', err)
      setError(err.response?.json?.error)
    } finally {
      setisLoading(false)
    }
  }

  return { joinOrg, isLoading, error }
}

