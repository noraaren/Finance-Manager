
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

module.exports = {
        getAccounts,
};