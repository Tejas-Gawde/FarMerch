// Various functions that will be exported to be used in the backend
export function sortCart(cart) {
    const consolidatedCart = {};
    for (const item of cart) {
        const { id, quantity } = item;
        consolidatedCart[parseInt(id)] = (consolidatedCart[parseInt(id)] || 0) + quantity;
    }
    return Object.entries(consolidatedCart).map(([id, quantity]) => ({ id: parseInt(id), quantity }));
}

export function combineCartAndProductData(cartData, productData) {
    const combinedData = [];
    for (const cartItem of cartData) {
        const { id, quantity } = cartItem;
        const matchingProduct = productData.find(product => product.id === id);
        if (matchingProduct) {
            combinedData.push({
                ...matchingProduct,
                quantity,
            });
        } else {
            console.warn(`Product with ID ${id} not found in product data`);
        }
    }
    return combinedData;
}

export function updateCartQuantity(cart, id, newQuantity) {
    // Find the item in the cart to update
    const itemIndex = cart.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        // Update the quantity of the existing item
        cart[itemIndex].quantity = newQuantity;
    } else {
        // If the item doesn't exist, create a new one (optional)
        console.warn(`Item with ID ${id} not found in cart.`);
    }
    return cart; // Return the updated cart
}

export function removeFromCart(cart, id) {
    // Efficiently remove the object using filter
    const updatedCart = cart.filter(item => item.id != id);
    return updatedCart;
}