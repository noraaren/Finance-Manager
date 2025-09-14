// CommonJS server entry
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {
  Configuration,
  PlaidApi,
  PlaidEnvironments,
  Products, // enum; you can also use plain strings like 'auth'
} = require('plaid');

const app = express();
const PORT = process.env.PORT || 3000;

let accessToken = null; // Store access_token in memory for demo purposes only
let itemID = null;
// In production, store access_token in a secure, persistent data store

app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, 
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});
const plaid = new PlaidApi(configuration);


app.post('/api/create_link_token', async (_req, res) => {
  const linkTokenReq = {
    user: { client_user_id: 'user-123' }, 
    client_name: 'Plaid Test App',
    products: [Products.Auth], 
    language: 'en',
    country_codes: ['US'],
    redirect_uri: 'http://localhost:3000/', 
  };

  try {
    const { data } = await plaid.linkTokenCreate(linkTokenReq);
    res.json(data);
  } catch (err) {
    console.error('linkTokenCreate error:', err.response?.data || err.message || err);
    res.status(500).json({ error: 'link_token_failed' });
  }
});


app.post('/api/exchange_public_token', async (req, res) => {
  const publicToken = req.body.publicToken;
  try {
    const response = await plaid.itemPublicTokenExchange({
      public_token: publicToken,
    });

    // These values should be saved to a persistent database and
    // associated with the currently signed-in user
    accessToken = response.data.access_token;
    itemID = response.data.item_id;

    console.log('Server response data:', response.data);
    console.log('Access token:', response.data.access_token);

    const serverResponse = { 
      public_token_exchange: 'complete',
      access_token: response.data.access_token 
    };
    
    console.log('Sending response:', serverResponse);
    res.json(serverResponse);
  } catch (error) {
    console.error('exchange_public_token error:', error.response?.data || error.message || error);
    res.status(500).json({ error: 'exchange_failed' });
  }
});


app.get('/api/accounts', async function (request, response, next) {
  try {
    const token = request.headers.authorization?.replace('Bearer ', '');
    console.log('Received token:', token);
    
    const accountsResponse = await plaid.accountsGet({
      access_token: token,
    });
    response.json(accountsResponse.data);
  } catch (error) {
    console.error('Error:', error);
    response.status(500).json({ error: 'Failed to get accounts' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});