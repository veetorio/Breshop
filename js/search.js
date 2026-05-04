import { getAllProducts } from './products.js';

let filteredProducts = [];

export function filterProductsBySearch(searchTerm) {
    const allProducts = getAllProducts();
    const term = searchTerm.toLowerCase().trim();

    if (!term) {
        filteredProducts = [];
        return allProducts;
    }

    filteredProducts = allProducts.filter(product => {
        const name = product.name.toLowerCase();
        const type = product.type.toLowerCase();
        return name.includes(term) || type.includes(term);
    });

    return filteredProducts;
}

export function getFilteredProducts() {
    return filteredProducts;
}

export function clearSearch() {
    filteredProducts = [];
}

export function isSearchActive() {
    return filteredProducts.length > 0;
}
