import { useState } from 'react';
import { UseAuthContext } from './UseAuthContext';
import { useNavigate} from 'react-router-dom';

export const useCreateOrg = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {loginSuccess} = UseAuthContext()
  const navigate = useNavigate()

  const createOrg = async (orgData, officeHeadData) => {
    setIsLoading(true);

    try {
      const Response = await fetch('/api/auth/signup-oh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(officeHeadData),
      });

      const officeHead = await Response.json();

      const orgResponse = await fetch('/api/auth/create-org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          officeHeadId: officeHead.user_id,...orgData
        }),
      });
      const orgjson = await orgResponse.json()
       
      if(orgResponse.ok){
        const { userType,username,user_id,token } = officeHead
        localStorage.setItem('user', JSON.stringify({ userType,token,username,user_id }))
        loginSuccess(token,user_id,username,userType)
        setIsLoading(false);
        setError(null);
        navigate('/')
      }
      else{   
        setIsLoading(false)
        setError(orgjson.error)
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message || 'An error occurred');
    }
  };

  return { createOrg, isLoading, error };
};

