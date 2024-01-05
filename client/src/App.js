import React from 'react';
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Navbar from './components/Navbar'
import Profile from './pages/Profile';
import UpdateProfile from './pages/UpdateProfile'
import SignupPage from './pages/Signuppage';
import JoinOrg from './pages/JoinOrg';
import CreateOrg from './pages/CreateOrg';
import ShiftSwapPage from './pages/ShiftSwap';


import { UseAuthContext } from './hooks/UseAuthContext'

function App() {

  const {token} = UseAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <div className='pages'>
          <Routes>
          <Route
            path="/"
            element={token ? <Home/> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={token? <Profile/> : <Navigate to="/login" />}
          />
          <Route
            path="/update-profile"
            element={token? <UpdateProfile/> : <Navigate to="/login" />}
          />
          <Route
            path="/shift-swap"
            element={token? <ShiftSwapPage/> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <Login/> : <Navigate to="/" />}
          />
          <Route
            path="/join-org"
            element={!token? <JoinOrg/> : <Navigate to="/" />}
          />
          <Route
            path="/create-org"
            element={!token? <CreateOrg/> : <Navigate to="/" />}
          />
          <Route
            path="/sign-up"
            element={!token? <SignupPage/> : <Navigate to="/" />}
          /> 
          </Routes>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
