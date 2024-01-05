import React, { useState,useEffect } from 'react';
import ShiftSwapForm from '../components/ShiftSwapForm';
import AcceptShiftSwapForm  from '../components/AcceptSSForm';
import SubmitToOfficeHeadForm from '../components/SubmitSSForm';
import UseShiftSwap from '../hooks/UseShiftSwap';
import { UseAuthContext } from '../hooks/UseAuthContext';

const ShiftSwapPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const { organizationId, officeHeadId } = userDetails;
  const { user_id,username} = UseAuthContext()
  const { shiftRequests, submitShiftSwapRequest, acceptShiftSwapRequest, submitToOfficeHead, error } = UseShiftSwap(
    organizationId
  );
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(user_id)
        const response = await fetch('/api/auth/getOrgandOHIds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify({user_id}),
        });
        const data = await response.json();
        console.log(data)
        setUserDetails(data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, [user_id]);

  const handleShiftSwapSubmit = (data) => {
    const requestData = { ...data, user_id };
    submitShiftSwapRequest(requestData);
  };

  const handleAcceptShiftSwap = (requestId) => {
    setSelectedRequestId(requestId);
  };

  const handleAcceptShiftSwapConfirm = () => {
    acceptShiftSwapRequest(selectedRequestId, user_id);
    setSelectedRequestId(null);
  };

  const handleSubmitToOfficeHead = () => {
    submitToOfficeHead(selectedRequestId, officeHeadId);
    setSelectedRequestId(null);
  };

  return (
    <div className='shift-swap-form'>
      <h2>Shift Swap Requests</h2>
      {error && <p>{error}</p>}
      <ShiftSwapForm onSubmit={handleShiftSwapSubmit} />
      <ul>
        {Array.isArray(shiftRequests) && shiftRequests.map((request) => (
          <li key={request._id}>
           <div className="shift-request-card">
              <div className="requester-info">
            Request from {request.requester.username} 
            </div>
            <div className="datetime-info">
               <p>Date: {new Date(request.date).toLocaleDateString()}</p>
               <p>Time: {request.time}</p>
            </div>
            {!request.accepter && (
              <button onClick={() => handleAcceptShiftSwap(request._id)}>Accept Request</button>
            )}
            {request.accepter && !request.approvedBy && (
              <button onClick={() => handleSubmitToOfficeHead(request._id)}>Submit to Office Head</button>
            )}
             </div>
          </li>
        ))}
      </ul>
      {selectedRequestId && (
        <AcceptShiftSwapForm onAccept={handleAcceptShiftSwapConfirm} />
      )}
      {selectedRequestId && (
        <SubmitToOfficeHeadForm onSubmitToOfficeHead={handleSubmitToOfficeHead} />
      )}
    </div>
  );
};

export default ShiftSwapPage;
