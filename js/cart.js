const STORAGE_KEY = 'breshop_cart';

export function addToCart(product) {
    const cart = getCartItems();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    return cart;
}

export function removeFromCart(productId) {
    let cart = getCartItems();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    return cart;
}

export function updateQuantity(productId, quantity) {
    const cart = getCartItems();
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
            return removeFromCart(productId);
        }
        saveCart(cart);
    }

    return cart;
}

export function getCartItems() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function getCartTotal() {
    const cart = getCartItems();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartCount() {
    const cart = getCartItems();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

export function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
}

function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}
