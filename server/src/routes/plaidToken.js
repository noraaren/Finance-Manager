// src/routes/plaidTokens.js
const express = require("express");
const { Products } = require("plaid");
const plaid = require("../config/plaid");

const router = express.Router();

router.post("/create_link_token", async (_req, res) => {
  const linkTokenReq = {
    user: { client_user_id: "user-123" },
    client_name: "Plaid Test App",
    products: [Products.Auth],
    language: "en",
    country_codes: ["US"],
    redirect_uri: "http://localhost:3000/",
  };

  try {
    const { data } = await plaid.linkTokenCreate(linkTokenReq);
    res.json(data);
  } catch (err) {
    console.error("linkTokenCreate error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "link_token_failed" });
  }
});

module.exports = router;

