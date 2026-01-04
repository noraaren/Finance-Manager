const { Products } = require("plaid");
const plaid = require("../config/plaid");

async function createLinkToken({
  clientUserId,
  clientName,
  redirectUri,
  products = [Products.Auth],
  countryCodes = ["US"],
  language = "en",
} = {}) {
  const linkTokenReq = {
    user: { client_user_id: clientUserId },
    client_name: clientName,
    products,
    language,
    country_codes: countryCodes,
    redirect_uri: redirectUri,
  };

  const { data } = await plaid.linkTokenCreate(linkTokenReq);
  return data;
}

module.exports = { createLinkToken };
