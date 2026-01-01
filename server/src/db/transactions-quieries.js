const { get } = require("http");
const supabase = require("./supabaseClient");

async function getAllTransactions(){
    const {data, error} = await supabase
    .from('transactions')
    .select("*");

    if (error) {
        console.error("Supabase getAllTransactions error:", error);
        throw error;
    }
    return data;
}



async function getTransactionById(id){
    const { data, error } = await supabase.from('transactions').select('*').eq('id', id).single();
    if (error) {
        console.error("Supabase getTransactionById error:", error);
        throw error;
    }
        
    return data;
    
} 

async function getAccessTransactionByUserId(userId){
    const {data, error} = await supabase
    .from("items")
    .select("access_token")
    .eq("user_id", userId)
    .single();

    if (error){
        console.error("Supabase getAccessTokenByUserId error:", error);
        throw error;
    }
    
    return data.access_token;
}

async function deleteTransaction(id){
    const {data, error} = await supabase
    .from('transactions')
    .delete()
    .match({id});
    
    if (error){
        console.error("Supabase deleteTransaction error:", error);
        throw error;
    }

}


module.exports = {
    getAllTransactions,
    getTransactionById,
    getAccessTransactionByUserId, 
    deleteTransaction
};