const checkout = document.getElementById('checkoutForm');
checkout.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('/stripe-checkout', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = data.sessionUrl;
        })
        .catch((err) => console.error(err));
});

