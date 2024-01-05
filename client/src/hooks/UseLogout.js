import { UseAuthContext } from "./UseAuthContext"
import { useNavigate } from "react-router-dom"

export const useLogout  = () => {
    const { logoutSuccess } = UseAuthContext()
    const navigate = useNavigate()
    
    const logout = async () => {
      try {
        localStorage.removeItem('user')
        logoutSuccess()
        navigate('/login')
      }
       catch (error) {
        console.error('Logout failed', error)
      }
    }

    return {logout}
}

