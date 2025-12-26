const express = require("express");
const router = express.Router();

router.use("/items", require("./plaidItems"));
router.use("/token", require("./plaidToken"));
router.use("/accounts", require("./plainAccounts"));


module.exports = router;