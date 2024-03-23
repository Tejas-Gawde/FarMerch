/*const paybtn= document.querySelector('btn btn-secondary m-2');
paybtn.addEventListener('click',() => {
    fetch('/stripe-checkout',{
        method:'post',
        headers:new Headers({'Content-Type':'application/json'}),
        body:JSON.stringify({
            items: JSON.parse(localStorage.getItem('itemArray')),

        }),
    })
    .then((res) => res.json())
    .then((url) => {
        location.href=url;
    })
    .catch((err) => console.log(err));
});*/

const checkout = document.querySelector('#checkout');

checkout.addEventListener('click', () => {
    fetch('/stripe-checkout', {
        method: 'post',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            items: JSON.parse(localStorage.getItem('itemArray')),
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        // Redirect to Stripe Checkout URL
        window.location.href = data.sessionUrl;
    })
    .catch((err) => console.error(err));
});
