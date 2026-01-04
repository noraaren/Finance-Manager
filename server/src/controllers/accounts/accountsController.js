
const plaid = require("../../config/plaid");
const accountsService = require("../../services/plaidAccounts");

async function getAccounts(req, res){
    try{
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
        return res.status(401).json({ error: "Missing access token" });
        }
        const accounts = await accountsService.getAccounts(token);
        console.log('Accounts fetched:', accounts);
        return res.json(accounts);
    }catch(error){
        console.error('Failed to get accounts', error);
        throw error;
    }
    
}


async function getAllAccountBalances(req, res){
    try{
        const token = req.headers.authorization?.replace("Bearer ", "");
        if(!token){return res.status(401).json({error: "Missing access token"});}
        const accountBalance = await accountsService.getAllAccountBalances(token);
        console.log('Account balances fetched:', accountBalance);
        return res.json(accountBalance);
    }catch(error){
        console.error('Failed to get all account balances', error);
        throw error;
    }
}

async function getBalanceForAccount(req, res){
    try{
        const token = req.headers.authorization?.replace("Bearer ", "");
        const accountId = req.params.accountId;
        if(!token){return res.status(401).json({error: "Missing access token"});}
        const accountBalance = await accountsService.getBalanceForAccount(token, accountId);
        console.log(`Balance for account ${accountId} fetched:`, accountBalance);
        return res.json(accountBalance);
    } catch (error) {
        console.error("Failed to get account balance", error.response?.data || error);
        return res.status(500).json({ error: "Failed to get account balance", details: error.response?.data });
        }
}

module.exports = {
        getAccounts,
        getAllAccountBalances,
        getBalanceForAccount
};