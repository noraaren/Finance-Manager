const express = require("express");
const { Products } = require("plaid");
const plaid = require("../config/plaid");

const router = express.Router();

router.get('/', async function (request, response, next) {
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

module.exports = router;


