
let cart = [
    { id: 29, quantity: 4 },
    { id: 29, quantity: 8 },
    { id: 24, quantity: 5 }
]

const checkout = document.getElementById('checkoutForm');
checkout.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/stripe-checkout', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
            items: cart,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = data.sessionUrl;
        })
        .catch((err) => console.error(err));
});
