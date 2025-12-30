const plaid = require("../config/plaid");

async function getAccounts(accessToken) {
  const resp = await plaid.accountsGet({
    access_token: accessToken,
  });

  return resp.data.accounts;
}

async function getAllAccountBalances(accessToken) {
  const resp = await plaid.accountsGet({
    access_token: accessToken,
  });
  return resp.data.accounts.map(account => ({
    account_id: account.account_id,
    balances: account.balances,
  }));
}


async function getBalanceForAccount(accessToken, accountId){
  try {
    const accounts = await getAccounts(accessToken);
    const account = accounts.find(acc => acc.account_id === accountId);
    if (!account) {
      throw new Error("Account not found");
    }
    return { account_id: account.account_id, balances: account.balances };
  } catch(error){
    console.log("PLAID ERROR status:", error.response?.status);
    console.log("PLAID ERROR data:", error.response?.data); 
    throw error;
  }
  
}

module.exports = { getAccounts, getAllAccountBalances, getBalanceForAccount };