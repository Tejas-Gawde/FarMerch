// Various functions that will be exported to be used in the backend
export function sortCart(cart) {
    const consolidatedCart = {};
    for (const item of cart) {
        const { id, quantity } = item;
        consolidatedCart[parseInt(id)] = (consolidatedCart[parseInt(id)] || 0) + quantity; // Parse ID before using it as a key
    }
    return Object.entries(consolidatedCart).map(([id, quantity]) => ({ id: parseInt(id), quantity })); // Parse ID before returning it
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