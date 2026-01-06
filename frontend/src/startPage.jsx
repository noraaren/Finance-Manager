import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import { useNavigate } from 'react-router-dom';

import './App.css';

function StartPage() {
  const navigate = useNavigate();
  const [linkToken, setLinkToken] = useState();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    async function fetchLinkToken() {
      const response = await axios.post('http://localhost:3000/token/create_link_token');
      setLinkToken(response.data.link_token);
    }
    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      let tokenFromResponse = null;
      console.log('Plaid Link onSuccess triggered');
      try {

        const response = await axios.post('http://localhost:3000/items/exchange_public_token', {
          publicToken: public_token,
        });

        tokenFromResponse = response.data.access_token;
        setAccessToken(tokenFromResponse);
        console.log(tokenFromResponse);
        console.log('Access token set successfully');
      } catch (error) {
        console.error('Error exchanging public token:', error);
      }

      console.log('success', public_token, metadata);
      console.log('Navigating to /MainPage...');
      navigate('/MainPage', {
        state: {
          accessToken: tokenFromResponse,
          publicToken: public_token,
          accountId: metadata.account_id,
          institution: metadata.institution?.name,
        },
      });
    },
  });

  return (
            
            <div>
              <button type="button" onClick={() => open()} disabled={!ready}>
                Start Plaid
              </button>
            </div>
    );
}

export default StartPage;
