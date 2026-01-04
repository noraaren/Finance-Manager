const { create } = require("domain");
const supabase = require("./supabaseClient");

async function getAllAccounts(){
    const accounts = await supabase.from('accounts').select("*");
    return accounts.data;
}

async function getAccountById(id){
    const { data, error } = await supabase.from('accounts').select('*').eq('id', id).single();
    if (error) {
        console.error("Supabase getAccountBy Id error:", error);
        throw error;
    }
    
    return data;
}

async function addAccount(itemId, name){
    const {data, error} = await supabase.from('accounts').insert([
        {item_id: itemId, name: name, created_at: new Date(), updated_at: new Date()}
    ]);
    if (error){
        console.error("Supabase addAccount error:", error);
        throw error;
    }
}

async function updateAccountName(id, name){
    const {data, error} = await supabase
    .from('accounts')
    .update({name: name, updated_at: new Date()})
    .match({id});


    if (error){
        console.error("Supabase updateAccount error:", error);
        throw error;
    }
}


async function deleteAccount(id){
    const {data, error} = await supabase
    .from('accounts')
    .delete()
    .match({id});

    if (error){
        console.error("Supabase deleteAccount error:", error);
        throw error;
    }
}



module.exports = { 
    getAllAccounts,
    getAccountById,
    addAccount,
    updateAccountName, 
    deleteAccount };