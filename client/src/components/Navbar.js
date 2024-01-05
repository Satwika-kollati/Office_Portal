import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/UseLogout'
import { UseAuthContext } from '../hooks/UseAuthContext'

const Navbar = () => {

  const { logout } = useLogout()
  const { token } = UseAuthContext()
  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Office Portal</h1>
        </Link>
        <nav>
            
           {token && (
            <div>
            <Link to = "/profile">My profile</Link>
            <Link to = "/shift-swap">Shift Swap</Link>
            <button onClick={handleClick}>Log Out</button>
            </div>
          )}
          {!token && (
            <div>
            <Link to = "/login">Login</Link>
            <Link to = "/sign-up">Signup</Link>
            </div>
          )}  
        </nav>
      </div>
    </header>
  )
}

export default Navbar