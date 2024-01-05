import React, { useState } from 'react';
import {useCreateOrg} from '../hooks/UseCreateOrg'

const CreateOrg = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [yearOfJoin, setYearOfJoin] = useState('');
  const [OrgName, setOrgName] = useState('');
  const [OrgID, setOrgID] = useState('');
  const [OrgKey, setOrgKey] = useState('');
  const [allowedRoles, setAllowedRoles] = useState([]);
  const [newRole, setNewRole] = useState('');


  const { createOrg, isLoading, error } = useCreateOrg();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orgData = {
      name: OrgName,
      id: OrgID,
      key: OrgKey,
      allowedRoles: allowedRoles,
    };

    const officeHeadData = {
      email,
      password,
      username,
      officerName,
      dateOfBirth,
      yearOfJoin,
    };
    
    await createOrg(orgData, officeHeadData);
  };

  return (
    <div className="joinorg-form">
      <h2>Create Office Portal for Your Organisation Now</h2>
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
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Year of Join:</label>
          <input
            type="number"
            value={yearOfJoin}
            onChange={(e) => setYearOfJoin(e.target.value)}
            required
          />
        </div>
        </div>
        <div className="form-column">
          <p><strong>Note:</strong> You will be the sole owner of this Organisation and will have full Authorization over it.</p>
          <p><strong>Neccesary details of Your Organisation : </strong></p>
          <div className="form-group">
          <label>Organisation Name:</label>
          <input
            type="text"
            value={OrgName}
            onChange={(e) => setOrgName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Organisation ID:</label>
          <input
            type="number"
            value={OrgID}
            placeholder='6-digit number'
            onChange={(e) => setOrgID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Organisation Key : (Give a secret key for employees's access purpose) </label>
          <input
            type="password"
            value={OrgKey}
            onChange={(e) => setOrgKey(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Add Allowed Roles:</label>
          <ul>
          {allowedRoles.map((role, index) => (
          <li key={index}>{role}</li>
          ))}
          </ul>
          <input
            type="text"
            value={newRole}
            placeholder="Add 'Other' if neccessary"
            onChange={(e) => setNewRole(e.target.value)}
          />
          <button
            type="button"
            onClick={() => {
              setAllowedRoles([...allowedRoles, newRole]);
              setNewRole('');
            }}>Add Role</button>
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Create Organisation & Signup'}
        </button>
        {error && <div className="error">{error}</div>}
        </div>
        </div>
      </form>
    </div>
  );
};

export default CreateOrg;
