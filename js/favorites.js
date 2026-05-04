const FAVORITES_KEY = 'breshop_favorites';

export function addToFavorites(productId) {
    const favorites = getFavorites();

    if (!favorites.includes(productId)) {
        favorites.push(productId);
        saveFavorites(favorites);
    }

    return favorites;
}

export function removeFromFavorites(productId) {
    let favorites = getFavorites();
    favorites = favorites.filter(id => id !== productId);
    saveFavorites(favorites);
    return favorites;
}

export function toggleFavorite(productId) {
    const favorites = getFavorites();

    if (favorites.includes(productId)) {
        return removeFromFavorites(productId);
    } else {
        return addToFavorites(productId);
    }
}

export function getFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
}

export function isFavorite(productId) {
    const favorites = getFavorites();
    return favorites.includes(productId);
}

export function updateFavoriteUI(productId) {
    const button = document.querySelector(`[data-favorite-btn="${productId}"]`);
    if (button) {
        const isFav = isFavorite(productId);
        if (isFav) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    }
}

function saveFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
