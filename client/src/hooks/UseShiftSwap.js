import { useState, useEffect } from 'react';
import { UseAuthContext } from './UseAuthContext';

const UseShiftSwap = (organizationId) => {
  const { token } = UseAuthContext();
  const [shiftRequests, setShiftRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShiftRequests = async () => {
      try {
        const response = await fetch(`/api/shiftSwap/shiftRequests/${organizationId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json();
        setShiftRequests(data);
      } catch (error) {
        setError('Error fetching shift requests');
      }
    };

    fetchShiftRequests();
  }, [organizationId,token]);

  const submitShiftSwapRequest = async (data) => {
    try {
        await fetch(`/api/shiftSwap/requestShiftSwap/${organizationId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });
          const response = await fetch(`/api/shiftSwap/shiftRequests/${organizationId}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newData = await response.json();
          setShiftRequests(newData);
    } catch (error) {
      setError('Error submitting shift swap request');
    }
  };

  const acceptShiftSwapRequest = async (requestId, accepterId) => {
    try {
        await fetch(`/api/shiftSwap/acceptShiftSwap/${requestId}/${accepterId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        const response = await fetch(`/api/shiftSwap/shiftRequests/${organizationId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newData = await response.json();
        setShiftRequests(newData);
    } catch (error) {
      setError('Error accepting shift swap request');
    }
  };

  const submitToOfficeHead = async (requestId, officeHeadId) => {
    try {
        await fetch(`/api/shiftSwap/submitToOfficeHead/${requestId}/${officeHeadId}`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        const response = await fetch(`/api/shiftSwap/shiftRequests/${organizationId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const newData = await response.json();
        setShiftRequests(newData);
    } catch (error) {
      setError('Error submitting to office head');
    }
  };

  return { shiftRequests, submitShiftSwapRequest, acceptShiftSwapRequest, submitToOfficeHead, error };
};

export default UseShiftSwap;
