import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import './App.css';

function App() {

  const [linkToken, setLinkToken] = useState();

  useEffect(() => {
    async function fetchLinkToken() {
      const response = await axios.post('http://localhost:3000/create_link_token');
      setLinkToken(response.data.link_token);
    }
    fetchLinkToken();
  },[]);

  const { open, ready } = usePlaidLink({
  token: linkToken,
  onSuccess: (public_token, metadata) => {
    console.log("success", public_token, metadata);
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


export default App
