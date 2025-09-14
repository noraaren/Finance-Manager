import { useLocation } from "react-router-dom";
import axios from 'axios';

export default function MainPage() {
  const location = useLocation();
  const { accessToken, publicToken, accountId, institution } = location.state || {};
  
  console.log('MainPage component rendered');
  console.log('Location state:', location.state);


  return (
    <div>
      <h1>Main Page</h1>
      <p>Access Token: {accessToken}</p>
      <p>Public Token: {publicToken}</p>
      <p>Account ID: {accountId}</p>
      <p>Institution: {institution}</p>

      {/* Replace this with a call to your backend, not Plaid Link */}
      <button
        type="button"
        onClick={async () => {
          const res = await axios.get("http://localhost:3000/api/accounts", {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });
          console.log(res.data);
          alert("Fetch data from your backend here");
        }}
      >
        Get Data
      </button>
    </div>
  );
}


