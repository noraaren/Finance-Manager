const plaid = require("../config/plaid");

async function getAccounts(accessToken) {
  const resp = await plaid.accountsGet({
    access_token: accessToken, // ✅ correct field name
  });

  return resp.data.accounts;
}

module.exports = { getAccounts };
