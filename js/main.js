import { PRODUCTS, getProductById } from './products.js';
import * as cart from './cart.js';
import * as favorites from './favorites.js';
import * as search from './search.js';

// ===== DOM ELEMENTS =====
const searchInput = document.getElementById('searchInput');
const cartBtn = document.getElementById('cartBtn');
const favoritesBtn = document.getElementById('favoritesBtn');
const cartModal = document.getElementById('cartModal');
const favoritesModal = document.getElementById('favoritesModal');
const closeFavoriteBtn = document.getElementById('close-modal-favorite');
const closeModalBtn = document.querySelector('.close');
const superioresGrid = document.getElementById('superioresGrid');
const inferioresGrid = document.getElementById('inferioresGrid');
const promocoesGrid = document.getElementById('promocoesGrid');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// ===== INITIALIZATION =====
function init() {
    renderProducts();
    setupEventListeners();
    updateCartUI();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    cartBtn.addEventListener('click', openCartModal);
    favoritesBtn.addEventListener('click', openFavoritesModal);
    closeModalBtn.addEventListener('click', closeCartModal);
    cartModal.addEventListener('click', closeOnBackdrop);
    checkoutBtn.addEventListener('click', handleCheckout);
    favoritesModal.addEventListener('click', closeOnBackdrop);
    closeFavoriteBtn.addEventListener('click', closeFavoritesModal);
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    const searchTerm = e.target.value;

    if (!searchTerm.trim()) {
        search.clearSearch();
        renderProducts();
        return;
    }

    const results = search.filterProductsBySearch(searchTerm);
    displaySearchResults(results);
}

function openFavoritesModal() {
    const modalBody = favoritesModal.querySelector('#favoritesItems');
    modalBody.innerHTML = ''; // Clear previous content
    const favoritesList = favorites.getFavorites();
    const products = favoritesList.map(id => getProductById(id)).filter(p => p);
    if (favoritesList.length === 0) {
        alert('Você ainda não tem produtos favoritos!');
        return;
    }

    products.forEach(product => renderFavoritesModal(product));
    favoritesModal.classList.add('active');

}
function closeFavoritesModal() {
    favoritesModal.classList.remove('active');
}

function renderFavoritesModal(product) {
    const modalBody = favoritesModal.querySelector('#favoritesItems');
    const favoriteItemBody = `
                <div class="favorite-item">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="favorite-name">${product.name}</span>
                    <span class="favorite-price">${product.price.toFixed(2)}R$</span>
                </div>
    `
    modalBody.innerHTML += favoriteItemBody;
}
function displaySearchResults(results) {
    superioresGrid.innerHTML = '';
    inferioresGrid.innerHTML = '';
    promocoesGrid.innerHTML = '';

    if (results.length === 0) {
        superioresGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #999;">Nenhum produto encontrado</p>';
        return;
    }

    const superiores = results.filter(p => p.type === 'superior');
    const inferiores = results.filter(p => p.type === 'inferior');
    const promocoes = results.filter(p => p.type === 'promocao');

    if (superiores.length > 0) {
        superioresGrid.innerHTML = superiores.map(p => createProductCard(p)).join('');
    } else {
        superioresGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 1rem; color: #999;">Nenhuma blusa encontrada</p>';
    }

    if (inferiores.length > 0) {
        inferioresGrid.innerHTML = inferiores.map(p => createProductCard(p)).join('');
    } else {
        inferioresGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 1rem; color: #999;">Nenhuma calça encontrada</p>';
    }

    if (promocoes.length > 0) {
        promocoesGrid.innerHTML = promocoes.map(p => createPromoCard(p)).join('');
    }

    attachProductEventListeners();
}

// ===== PRODUCT RENDERING =====
function renderProducts() {
    renderProductSection('superioresGrid', PRODUCTS.superiores, 'product');
    renderProductSection('inferioresGrid', PRODUCTS.inferiores, 'product');
    renderAcessorios();
    renderTenis()
}

function renderProductSection(containerId, products, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = products.map(p => {
        if (type === 'product') {
            return createProductCard(p);
        }
        return '';
    }).join('');

    attachProductEventListeners();
}

function renderAcessorios() {
    const container = document.getElementById('acessoriosGrid');
    container.innerHTML = PRODUCTS.acessorios.map(p => createProductCard(p)).join('');
    attachProductEventListeners();
}
function renderTenis() {
    const container = document.getElementById('tenisGrid');
    container.innerHTML = PRODUCTS.tenis.map(p => createProductCard(p)).join('');
    attachProductEventListeners();
}

function createProductCard(product) {
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const isFav = favorites.isFavorite(product.id);

    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="product-favorite ${isFav ? 'active' : ''}" data-favorite-btn="${product.id}">
                    <img src="assets/icons/favorites.svg" alt="Favoritar">
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-pricing">
                    <div class="price-section">
                        ${product.originalPrice ? `<span class="product-original-price">R$ ${product.originalPrice.toFixed(2)}</span>` : ''}
                        <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    </div>
                    ${discount > 0 ? `<span class="product-discount">${discount}% OFF</span>` : ''}
                </div>
                <button class="product-button" data-product-id="${product.id}">
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    `;
}

function createPromoCard(product) {
    const isFav = favorites.isFavorite(product.id);
    const featured = product.featured ? 'featured' : '';

    return `
        <div class="promo-item ${featured}">
            <img src="${product.image}" alt="${product.name}">
            ${product.discount ? `<div class="promo-badge discount">Oferta de ${product.discount}%</div>` : ''}
            <div class="promo-info ${featured}">
                <div class="promo-name">${product.name}</div>
                <div class="promo-price">R$ ${product.price.toFixed(2)}</div>
            </div>
        </div>
    `;
}

function attachProductEventListeners() {
    // Add to cart buttons
    document.querySelectorAll('.product-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const product = getProductById(productId);
            handleAddToCart(product);
        });
    });

    // Favorite buttons
    document.querySelectorAll('.product-favorite').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-favorite-btn');
            handleToggleFavorite(productId);
        });
    });
}

// ===== CART FUNCTIONALITY =====
function handleAddToCart(product) {
    cart.addToCart(product);
    updateCartUI();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

function handleToggleFavorite(productId) {
    favorites.toggleFavorite(productId);
    favorites.updateFavoriteUI(productId);
    const isFav = favorites.isFavorite(productId);
    showNotification(isFav ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!');
}

function updateCartUI() {
    const count = cart.getCartCount();
    cartCount.textContent = count;
}

function openCartModal() {
    cartModal.classList.add('active');
    renderCartModal();
}

function closeCartModal() {
    cartModal.classList.remove('active');
}

function closeOnBackdrop(e) {
    if (e.target === cartModal) {
        closeCartModal();
    }
}

function renderCartModal() {
    const items = cart.getCartItems();
    const total = cart.getCartTotal();

    if (items.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItemsContainer.innerHTML = items.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 0.5rem;">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity - 1})">−</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateItemQuantity('${item.id}', ${item.quantity + 1})">+</button>
                <button class="cart-remove-btn" onclick="removeCartItem('${item.id}')">Remover</button>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = total.toFixed(2);
}

window.updateItemQuantity = function(productId, newQuantity) {
    if (newQuantity <= 0) {
        cart.removeFromCart(productId);
    } else {
        cart.updateQuantity(productId, newQuantity);
    }
    updateCartUI();
    renderCartModal();
};

window.removeCartItem = function(productId) {
    cart.removeFromCart(productId);
    updateCartUI();
    renderCartModal();
};

function handleCheckout() {
    const items = cart.getCartItems();
    if (items.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }

    alert('Compra finalizada com sucesso! Obrigado por usar Breshop.');
    cart.clearCart();
    updateCartUI();
    closeCartModal();
    searchInput.value = '';
    search.clearSearch();
    renderProducts();
}

// ===== NOTIFICATIONS =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== START APP =====
document.addEventListener('DOMContentLoaded', init);
