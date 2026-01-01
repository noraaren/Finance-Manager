const { get } = require("http");
const supabase = require("./supabaseClient");

async function getAllItems(){
    const {data, error} = await supabase
    .from('items')
    .select("*");

    if (error) {
        console.error("Supabase getAllItems error:", error);
        throw error;
    }
    return data;
}



async function getItemById(id){
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error) {
        console.error("Supabase getItemById error:", error);
        throw error;
    }
        
    return data;
    
} 

async function getAccessTokenByItemId(itemId){
    const {data, error} = await supabase
    .from("items")
    .select("access_token")
    .eq("id", itemId)
    .single();

    if (error){
        console.error("Supabase getAccessTokenByItemId error:", error);
        throw error;
    }
    
    return data.access_token;
}

async function deleteItem(id){
    const {data, error} = await supabase
    .from('items')
    .delete()
    .match({id});
    
    if (error){
        console.error("Supabase deleteItem error:", error);
        throw error;
    }

}


module.exports = {
    getAllItems,
    getItemById,
    getAccessTokenByItemId, 
    deleteItem
};