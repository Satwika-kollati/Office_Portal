import React, { useState } from 'react';
import { UseJoinOrg } from '../hooks/UseJoinOrg';

const JoinOrg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [yearOfJoin, setYearOfJoin] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [OrgID, setOrgID] = useState('');
  const [OrgKey, setOrgKey] = useState('');


  const { joinOrg , isLoading , error} = UseJoinOrg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
      username,
      officerName,
      dateOfBirth,
      yearOfJoin,
      jobTitle,
      OrgID,
      OrgKey
    };

    await joinOrg(userData);
  };

  return (
    <div className="joinorg-form">
      <h2>Join Your Organisation Now</h2>
      <h3>Sign up to create your account</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-columns">
        <div className="form-column">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Officer Name:</label>
          <input
            type="text"
            value={officerName}
            onChange={(e) => setOfficerName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Year of Join:</label>
          <input
            type="number"
            value={yearOfJoin}
            onChange={(e) => setYearOfJoin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
        </div>
        <div className="form-column">
          <p><strong>Neccesary details of Your Organisation :</strong></p>
        <div className="form-group">
          <label>Organisation ID:</label>
          <input
            type="number"
            value={OrgID}
            onChange={(e) => setOrgID(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Organisation Key:</label>
          <input
            type="password"
            value={OrgKey}
            onChange={(e) => setOrgKey(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
        {error && <div className="error">{error}</div>}
        </div>
        </div>
      </form>
    </div>
  );
};

export default JoinOrg;
