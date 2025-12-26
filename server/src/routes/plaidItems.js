const express = require("express");
const { Products } = require("plaid");
const plaid = require("../config/plaid");
const plaidToken = require("./plaidToken");

const router = express.Router();

router.post('/exchange_public_token', async (req, res) => {
  const publicToken = req.body.publicToken;
  try {
    const response = await plaid.itemPublicTokenExchange({
      public_token: publicToken,
    });


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

module.exports = router;