/* ============================
   CART MANAGEMENT
   ============================ */
class CartManager {
    constructor() {
        this.items = [];
        this.loadCart();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.notifyCartAdded(product);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(quantity, 1);
            this.saveCart();
        }
    }

    getCartTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    saveCart() {
        localStorage.setItem('breshop_cart', JSON.stringify(this.items));
    }

    loadCart() {
        const saved = localStorage.getItem('breshop_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }

    notifyCartAdded(product) {
        console.log(`✓ Produto adicionado ao carrinho:`, product.name, `- R$ ${product.price}`);
        console.log(`Quantidade no carrinho: ${this.getCartCount()} itens`);
    }

    clear() {
        this.items = [];
        this.saveCart();
    }
}

/* ============================
   FAVORITES MANAGEMENT
   ============================ */
class FavoritesManager {
    constructor() {
        this.favorites = [];
        this.loadFavorites();
    }

    toggleFavorite(productId) {
        const index = this.favorites.indexOf(productId);
        
        if (index === -1) {
            this.favorites.push(productId);
            console.log(`❤️ Adicionado aos favoritos - ID: ${productId}`);
        } else {
            this.favorites.splice(index, 1);
            console.log(`🤍 Removido dos favoritos - ID: ${productId}`);
        }
        
        this.saveFavorites();
        return index === -1;
    }

    isFavorite(productId) {
        return this.favorites.includes(productId);
    }

    saveFavorites() {
        localStorage.setItem('breshop_favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = localStorage.getItem('breshop_favorites');
        if (saved) {
            this.favorites = JSON.parse(saved);
        }
    }

    clear() {
        this.favorites = [];
        this.saveFavorites();
    }
}

/* ============================
   SEARCH FUNCTIONALITY
   ============================ */
class SearchManager {
    constructor() {
        this.products = [
            { id: 1, name: 'Camisa Premium', category: 'camisas' },
            { id: 2, name: 'Camiseta Básica', category: 'camisetas' },
            { id: 3, name: 'Camisa Floral', category: 'camisas' },
            { id: 4, name: 'Camisa Listrada', category: 'camisas' },
            { id: 5, name: 'Jaqueta Casual', category: 'jaquetas' },
            { id: 6, name: 'Camisa Denim', category: 'camisas' },
            { id: 7, name: 'Camisa Xadrez', category: 'camisas' },
            { id: 8, name: 'Polo Premium', category: 'polos' },
            { id: 9, name: 'Camisa Desconto', category: 'promoções' },
            { id: 10, name: 'Camiseta Promoção', category: 'promoções' },
            { id: 11, name: 'Camisa Estampada', category: 'camisas' },
            { id: 12, name: 'Camisa Social', category: 'camisas' }
        ];
    }

    search(query) {
        if (!query.trim()) {
            return this.products;
        }

        const lowerQuery = query.toLowerCase();
        
        return this.products.filter(product => 
            product.name.toLowerCase().includes(lowerQuery) ||
            product.category.toLowerCase().includes(lowerQuery)
        );
    }

    highlightResults(results) {
        if (results.length === 0) {
            console.log(`❌ Nenhum produto encontrado para a busca.`);
            return;
        }

        console.log(`🔍 Resultados da busca (${results.length} produtos encontrados):`);
        results.forEach(product => {
            console.log(`   • ${product.name} (Categoria: ${product.category})`);
        });
    }
}

/* ============================
   INITIALIZATION & EVENT LISTENERS
   ============================ */
let cartManager = null;
let favoritesManager = null;
let searchManager = null;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    cartManager = new CartManager();
    favoritesManager = new FavoritesManager();
    searchManager = new SearchManager();

    // Setup event listeners
    setupSearchListener();
    setupAddToCartListeners();
    setupFavoriteListeners();
    setupLoginListener();
    setupExploreListener();
    initializeFavoriteStates();
});

/* ============================
   SEARCH INPUT LISTENER
   ============================ */
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const results = searchManager.search(query);
            searchManager.highlightResults(results);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                const results = searchManager.search(query);
                searchManager.highlightResults(results);
            }
        });
    }
}

/* ============================
   ADD TO CART LISTENERS
   ============================ */
function setupAddToCartListeners() {
    const addToCartButtons = document.querySelectorAll('.btn-add-product');

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = parseFloat(
                productCard.querySelector('.product-price').textContent.replace('R$', '').trim()
            );

            const product = {
                id: index,
                name: productName,
                price: productPrice
            };

            cartManager.addItem(product);
            updateCartIndicator();
            showAddedNotification(button);
        });
    });

    const bannerAddButton = document.querySelector('.btn-add-cart');
    if (bannerAddButton) {
        bannerAddButton.addEventListener('click', () => {
            const product = {
                id: 'banner-product',
                name: 'Camisas da oxygeny',
                price: 20.00
            };

            cartManager.addItem(product);
            updateCartIndicator();
            showAddedNotification(bannerAddButton);
        });
    }
}

/* ============================
   FAVORITE LISTENERS
   ============================ */
function setupFavoriteListeners() {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    favoriteButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const isFavorite = favoritesManager.toggleFavorite(index);
            button.classList.toggle('active', isFavorite);
            
            if (isFavorite) {
                button.textContent = '❤️';
            } else {
                button.textContent = '🤍';
            }
        });
    });
}

/* ============================
   INITIALIZE FAVORITE STATES
   ============================ */
function initializeFavoriteStates() {
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    favoriteButtons.forEach((button, index) => {
        if (favoritesManager.isFavorite(index)) {
            button.classList.add('active');
            button.textContent = '❤️';
        }
    });
}

/* ============================
   LOGIN BUTTON LISTENER
   ============================ */
function setupLoginListener() {
    const loginButton = document.querySelector('.action-btn');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('breshop_logged_in');
            
            if (isLoggedIn) {
                localStorage.removeItem('breshop_logged_in');
                loginButton.textContent = 'entrar';
                console.log('👋 Você foi desconectado');
            } else {
                localStorage.setItem('breshop_logged_in', 'true');
                loginButton.textContent = 'sair';
                console.log('✅ Você foi conectado com sucesso!');
            }
        });

        // Check if user is already logged in
        if (localStorage.getItem('breshop_logged_in')) {
            loginButton.textContent = 'sair';
        }
    }
}

/* ============================
   EXPLORE BUTTON LISTENER
   ============================ */
function setupExploreListener() {
    const exploreButton = document.querySelector('.btn-explore');

    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            const productsSection = document.querySelector('.products-top');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/* ============================
   CART INDICATOR UPDATE
   ============================ */
function updateCartIndicator() {
    const cartButton = document.querySelector('.cart-btn');
    const count = cartManager.getCartCount();

    if (count > 0) {
        // Add visual indicator
        let badge = cartButton.querySelector('.cart-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-badge';
            cartButton.appendChild(badge);
        }
        badge.textContent = count;
        badge.style.position = 'absolute';
        badge.style.top = '-8px';
        badge.style.right = '-8px';
        badge.style.backgroundColor = '#ff6b35';
        badge.style.color = '#fff';
        badge.style.borderRadius = '50%';
        badge.style.width = '24px';
        badge.style.height = '24px';
        badge.style.display = 'flex';
        badge.style.alignItems = 'center';
        badge.style.justifyContent = 'center';
        badge.style.fontSize = '12px';
        badge.style.fontWeight = 'bold';
    }
}

/* ============================
   ADDED NOTIFICATION
   ============================ */
function showAddedNotification(button) {
    const originalText = button.textContent;
    button.textContent = '✓ Adicionado!';
    button.style.backgroundColor = '#4caf50';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
    }, 1500);
}

/* ============================
   CATEGORY CARDS LISTENER
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoryName = card.querySelector('h3').textContent;
            console.log(`📂 Categoria selecionada: ${categoryName}`);
        });
    });
});

/* ============================
   TREND CARDS LISTENER
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    const trendViewButtons = document.querySelectorAll('.btn-see');

    trendViewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const trendCard = button.closest('.trend-card');
            const trendName = trendCard.querySelector('h3').textContent;
            console.log(`👀 Visualizando tendência: ${trendName}`);
        });
    });
});

/* ============================
   CART OPERATIONS LOGGING
   ============================ */
function logCartOperations() {
    console.log('%c=== CART MANAGER ===', 'color: #667eea; font-size: 14px; font-weight: bold;');
    console.log(`Total de itens: ${cartManager.getCartCount()}`);
    console.log(`Total em R$: R$ ${cartManager.getCartTotal().toFixed(2)}`);
    console.log('Itens no carrinho:', cartManager.items);
    console.log('%c==================', 'color: #667eea; font-size: 14px; font-weight: bold;');
}

/* ============================
   FAVORITES LOGGING
   ============================ */
function logFavorites() {
    console.log('%c=== FAVORITES ===', 'color: #ff6b35; font-size: 14px; font-weight: bold;');
    console.log(`Total de favoritos: ${favoritesManager.favorites.length}`);
    console.log('IDs dos favoritos:', favoritesManager.favorites);
    console.log('%c================', 'color: #ff6b35; font-size: 14px; font-weight: bold;');
}

/* ============================
   SMOOTH SCROLLING
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

/* ============================
   HOVER EFFECTS
   ============================ */
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const image = card.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.3s ease';
            }
        });

        card.addEventListener('mouseleave', () => {
            const image = card.querySelector('.product-image');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

/* ============================
   EXPORT FUNCTIONS FOR CONSOLE
   ============================ */
window.showCart = function() {
    logCartOperations();
};

window.showFavorites = function() {
    logFavorites();
};

window.clearCart = function() {
    cartManager.clear();
    console.log('🗑️ Carrinho limpo');
    updateCartIndicator();
};

window.clearFavorites = function() {
    favoritesManager.clear();
    document.querySelectorAll('.btn-favorite').forEach(button => {
        button.classList.remove('active');
        button.textContent = '🤍';
    });
    console.log('🗑️ Favoritos limpo');
};

window.searchProduct = function(query) {
    const results = searchManager.search(query);
    searchManager.highlightResults(results);
    return results;
};

/* ============================
   CONSOLE HELPERS
   ============================ */
console.log('%c🛍️ BreshopeCommerce System Loaded', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cComandos disponíveis:', 'color: #764ba2; font-size: 12px; font-weight: bold;');
console.log('  → showCart() - Exibe o carrinho');
console.log('  → showFavorites() - Exibe os favoritos');
console.log('  → clearCart() - Limpa o carrinho');
console.log('  → clearFavorites() - Limpa os favoritos');
console.log('  → searchProduct("termo") - Busca por produtos');
