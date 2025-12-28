const express = require("express");
const { Products } = require("plaid");
const plaid = require("../config/plaid");
const accountsController = require("../controllers/accounts/accountsController");

const router = express.Router();

router.get("/", accountsController.getAccounts);

module.exports = router;


