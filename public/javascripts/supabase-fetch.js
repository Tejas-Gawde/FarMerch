const supabase = require('./supabase.js') ;
var itemArray = null;
async function fetchData(){
    let { data: items, error } = await supabase.from('items')
  .select('*')
  if (error) {
    alert(error)
}
else {
    console.log("success");
    itemArray = items
}
}

fetchData();
