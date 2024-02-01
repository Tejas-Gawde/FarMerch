import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabase = createClient(
    "https://xkbaxhajuykyvvzstdfn.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrYmF4aGFqdXlreXZ2enN0ZGZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3MDEwNTEsImV4cCI6MjAxMDI3NzA1MX0.ymfXSwBn9oK3-M3e597xHgR-m16H7yyAf1mbmJrbEmw");
    

// References
var itemCategory = document.getElementById('selectCategory');
var itemName = document.getElementById('itemName');
var itemPrice = document.getElementById('itemPrice');
var itemUrl = document.getElementById('itemUrl');
var itemDescp1 = document.getElementById('itemDescp1');
var itemDescp2 = document.getElementById('itemDescp2');
var itemDescp2 = document.getElementById('itemDescp3');
var uploadBtn = document.getElementById('upload');

// Function to Upload to Supabase
async function uploadData() {
    const { data, error } = await supabase
    .from('items')
    .insert([
        { 
            category: itemCategory.value,
            name: itemName.value, 
            price: itemPrice.value, 
            url: itemUrl.value, 
            descp1: itemDescp1.value, 
            descp2: itemDescp2.value, 
            descp3: itemDescp3.value, 
        },
    ])
    .select();
    if (error) {
        alert(error)
    }
    else {
        alert("Upload Successfull");
        console.log(data);
    }

}
// EventListeners
uploadBtn.addEventListener('click',()=>{
    uploadData();
})

