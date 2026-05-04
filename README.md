# 🛍️ Breshop - E-commerce Moderno

Um e-commerce totalmente responsivo desenvolvido com HTML5, CSS3 e JavaScript Vanilla, seguindo princípios de design moderno e boas práticas de desenvolvimento.

## 📋 Características

✅ **Design Responsivo** - Adaptado para desktop, tablet e mobile
✅ **Vanilla JS** - Sem dependências externas
✅ **CSS Variables** - Fácil personalização de cores e espaçamentos
✅ **Funcionalidades Completas**:
  - Carrinho de compras com localStorage
  - Sistema de favoritos persistente
  - Busca de produtos funcional
  - Login simulado
  - Interações suaves

## 📁 Estrutura do Projeto

```
/Breshop
├── index.html           # Estrutura HTML semântica
├── css/
│   └── styles.css       # Estilos com CSS variables
├── js/
│   └── script.js        # Lógica JavaScript e interações
└── assets/
    ├── images/          # Pasta para imagens
    └── icons/           # Pasta para ícones
```

## 🎨 Seções Implementadas

1. **Header** - Logo, busca, autenticação e ícones
2. **Banner Principal** - Destaque com gradiente e desconto
3. **Barra de Benefícios** - Informações de frete, parcelamento, etc
4. **Categorias** - Cards com gradientes e navegação
5. **Tendências** - Seção de trends com imagens
6. **Produtos Selecionados** - Grid responsivo de produtos
7. **Promoções Especiais** - Produtos com descontos
8. **Banner Final** - Call-to-action com gradiente
9. **Footer** - Links e newsletter

## 🎯 Funcionalidades JavaScript

### Gerenciamento de Carrinho
```javascript
cartManager.addItem(product);     // Adiciona produto
cartManager.getCartTotal();       // Total do carrinho
cartManager.getCartCount();       // Quantidade de itens
showCart();                       // Exibe no console
clearCart();                      // Limpa o carrinho
```

### Sistema de Favoritos
```javascript
favoritesManager.toggleFavorite(productId);  // Alterna favorito
favoritesManager.isFavorite(productId);      // Verifica se é favorito
showFavorites();                             // Exibe no console
clearFavorites();                            // Limpa favoritos
```

### Busca de Produtos
```javascript
searchProduct("camisa");  // Busca por termo
```

## 🎨 Cores Principais

```css
--primary-color: #000;           /* Preto principal */
--secondary-color: #fff;         /* Branco */
--accent-color: #ff6b35;         /* Laranja destaque */
--text-dark: #1a1a1a;           /* Texto escuro */
--text-light: #666;              /* Texto claro */
```

## 📐 Gradientes

```css
--gradient-banner: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-category-1: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
--gradient-category-2: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
--gradient-category-3: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
--gradient-category-4: linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%);
```

## 🚀 Como Usar

1. **Abra o arquivo** `index.html` em um navegador
2. **Interaja com os produtos**:
   - Clique em "Adicionar ao Carrinho" para adicionar produtos
   - Clique no ícone de coração para adicionar aos favoritos
   - Use a barra de busca para encontrar produtos
3. **Abra o Console** (F12) para ver logs das ações

## 📱 Responsividade

- **Desktop** (1200px+) - Layout completo com 4 colunas
- **Tablet** (768px - 1199px) - 2 colunas
- **Mobile** (< 768px) - 1 coluna adaptada

## 💾 LocalStorage

O projeto utiliza localStorage para persistir dados:
- `breshop_cart` - Itens do carrinho
- `breshop_favorites` - Produtos favoritos
- `breshop_logged_in` - Status de autenticação

## 🔧 Personalização

### Alterar Cores Principais
Edite as variáveis CSS em `styles.css`:

```css
:root {
    --primary-color: #seu-cor;
    --accent-color: #sua-cor;
    --gradient-primary: linear-gradient(...);
}
```

### Adicionar Novos Produtos
Modifique o array de produtos em `script.js`:

```javascript
this.products = [
    { id: 13, name: 'Novo Produto', category: 'categoria' },
    // ...
];
```

## 🎯 Boas Práticas Implementadas

✅ **Semântica HTML5** - Uso correto de tags semânticas
✅ **CSS Organizável** - Variáveis e comentários claros
✅ **Classes Bem Nomeadas** - Nomes descritivos em kebab-case
✅ **Separação de Responsabilidades** - HTML, CSS e JS independentes
✅ **Responsividade Mobile-First** - Media queries organizadas
✅ **Acessibilidade** - Atributos alt, titles e navegação por teclado
✅ **Performance** - Sem dependências externas

## 📊 Classes CSS Principais

- `.header` - Cabeçalho principal
- `.main-banner` - Banner principal com destaque
- `.benefits-bar` - Barra de benefícios
- `.categories-section` - Seção de categorias
- `.products-section` - Seção de produtos
- `.trends-section` - Seção de tendências
- `.promotions-section` - Seção de promoções
- `.final-banner` - Banner final
- `.footer` - Rodapé

## 🖥️ Compatibilidade

- ✅ Chrome (versão 90+)
- ✅ Firefox (versão 88+)
- ✅ Safari (versão 14+)
- ✅ Edge (versão 90+)
- ✅ Mobile browsers modernos

## 📝 Notas de Desenvolvimento

- O projeto usa **localStorage** para persistência de dados
- **Smooth scrolling** implementado em toda a página
- **Hover effects** em cards e botões
- **Console helpers** para debug e teste
- **Notificações** visuais ao adicionar ao carrinho

## 🔐 Comandos Console Disponíveis

```javascript
showCart()          // Mostra carrinho completo
showFavorites()     // Mostra produtos favoritos
clearCart()         // Limpa o carrinho
clearFavorites()    // Limpa favoritos
searchProduct("termo")  // Busca produtos
```

## 📄 Licença

Este projeto é de código aberto e pode ser usado livremente.

---

**Desenvolvido com ❤️ - Vanilla JavaScript + HTML5 + CSS3**
