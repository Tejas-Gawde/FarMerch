import { supabase } from "./supabase.js";


let { data: items, error } = await supabase
  .from('items')
  .select('*')
  if (error) {
    alert(error)
}
else {
    console.log(items);
}

export const itemArray = items.map(item => {
    return {
        id: item.id,
        name: item.name,
        price: item.price,
        url: item.url,
        descp1: item.descp1,
        descp2: item.descp2,
        descp3: item.descp3,
    }
})