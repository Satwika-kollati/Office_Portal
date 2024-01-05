import React from 'react'
import { Link } from 'react-router-dom'


const SignupPage = () => {
  return (
    <div className="signup-container">
      <div className="signup-options">
        <div className="blue-bg signup-option">
          <h2>Join an Organisation</h2>
          <p>Are you part of an Organisation? Join now to access your Office Portal</p>
          <Link to="/join-org">
          <button>Join Now</button>
          </Link>
          <p>Already have an account? </p>
          <Link to="/login">Login here</Link>
        </div>
        <div className="white-bg signup-option">
          <h2>Create an Organisation</h2>
          <p>Create a portal for your Organisation now to make your work simpler.</p>
          <Link to="/create-org">
          <button>Create Now</button>
          </Link>
          <p>Already have an account? </p>
          <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
