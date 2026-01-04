const express = require("express");
const { createLinkToken } = require("../services/plaidTokenService");

const router = express.Router();

router.post("/create_link_token", async (_req, res) => {
  try {
    const data = await createLinkToken({
      clientUserId: "user-123",
      clientName: "Plaid Test App",
      redirectUri: "http://localhost:3000/",
    });
    res.json(data);
  } catch (err) {
    console.error("linkTokenCreate error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "link_token_failed" });
  }
});

module.exports = router;

