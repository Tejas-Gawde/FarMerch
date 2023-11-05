// References
var Cart1 = document.getElementById('cart1');

// EventListeners
Cart1.addEventListener('click', async (e)=>{
    e.preventDefault();
    const res = await fetch('/products',
    {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            parcel: itemName.innerText
        })
    })
})