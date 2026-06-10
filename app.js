// Dados mockados de produtos
const PRODUCTS = [
    // Vestidos
    { id: 1, name: 'Vestido Floral Elegante', category: 'vestidos', price: 129.90, image: 'https://via.placeholder.com/300x400?text=Vestido+Floral', rating: 4.5, reviews: 12, description: 'Vestido floral com tecido macio' },
    { id: 2, name: 'Vestido Preto Sofisticado', category: 'vestidos', price: 149.90, image: 'https://via.placeholder.com/300x400?text=Vestido+Preto', rating: 5, reviews: 8, description: 'Vestido preto elegante' },
    { id: 3, name: 'Vestido Branco Minimalista', category: 'vestidos', price: 119.90, image: 'https://via.placeholder.com/300x400?text=Vestido+Branco', rating: 4, reviews: 15, description: 'Vestido branco simples' },
    // Calças
    { id: 4, name: 'Calça Jeans Skinny', category: 'calcas', price: 89.90, image: 'https://via.placeholder.com/300x400?text=Calça+Jeans', rating: 4.5, reviews: 20, description: 'Calça jeans skinny' },
    { id: 5, name: 'Calça Branca Reta', category: 'calcas', price: 99.90, image: 'https://via.placeholder.com/300x400?text=Calça+Branca', rating: 4, reviews: 10, description: 'Calça branca reta' },
    { id: 6, name: 'Calça Preta Slim', category: 'calcas', price: 94.90, image: 'https://via.placeholder.com/300x400?text=Calça+Preta', rating: 4.5, reviews: 18, description: 'Calça preta slim' },
    // Blusas
    { id: 7, name: 'Blusa Branca Básica', category: 'blusas', price: 49.90, image: 'https://via.placeholder.com/300x400?text=Blusa+Branca', rating: 4, reviews: 25, description: 'Blusa branca básica' },
    { id: 8, name: 'Blusa Amarela Estampada', category: 'blusas', price: 59.90, image: 'https://via.placeholder.com/300x400?text=Blusa+Amarela', rating: 4.5, reviews: 14, description: 'Blusa amarela estampada' },
    { id: 9, name: 'Blusa Preta Elegante', category: 'blusas', price: 69.90, image: 'https://via.placeholder.com/300x400?text=Blusa+Preta', rating: 5, reviews: 11, description: 'Blusa preta elegante' }
];

// Estado da aplicação
let currentPage = 'home';
let cart = [];
let selectedCategory = 'todos';
let isLoggedIn = false;
let userRole = null;

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadUserFromStorage();
    renderPage();
});

// Carregar usuário do localStorage
function loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        isLoggedIn = true;
        userRole = userData.role;
    }
}

// Renderizar página
function renderPage() {
    const app = document.getElementById('app');
    
    if (currentPage === 'home') {
        app.innerHTML = renderHome();
    } else if (currentPage === 'login') {
        app.innerHTML = renderLogin();
    } else if (currentPage === 'register') {
        app.innerHTML = renderRegister();
    } else if (currentPage === 'cart') {
        app.innerHTML = renderCart();
    } else if (currentPage === 'checkout') {
        app.innerHTML = renderCheckout();
    } else if (currentPage === 'admin' && isLoggedIn && userRole === 'admin') {
        app.innerHTML = renderAdmin();
    } else {
        app.innerHTML = renderHome();
    }
    
    attachEventListeners();
}

// Renderizar Header
function renderHeader() {
    return `
        <header>
            <div class="header-container">
                <a href="#" class="logo" onclick="goToPage('home'); return false;">
                    <div class="logo-icon">AJ</div>
                    <div class="logo-text">
                        <h1>Ateliê Joyce Serafim</h1>
                        <p>Moda Feminina</p>
                    </div>
                </a>
                
                <nav>
                    <a href="#" onclick="goToPage('home'); return false;">Catálogo</a>
                    ${isLoggedIn && userRole === 'admin' ? '<a href="#" onclick="goToPage(\'admin\'); return false;">Admin</a>' : ''}
                </nav>
                
                <div class="header-actions">
                    <div class="cart-icon" onclick="goToPage('cart'); return false;">
                        🛒
                        ${cart.length > 0 ? `<span class="cart-count">${cart.length}</span>` : ''}
                    </div>
                    ${isLoggedIn ? `
                        <button class="btn btn-primary" onclick="logout()">Sair</button>
                    ` : `
                        <a href="#" onclick="goToPage('login'); return false;" class="btn btn-primary">Entrar</a>
                    `}
                </div>
            </div>
        </header>
    `;
}

// Renderizar Footer
function renderFooter() {
    return `
        <footer>
            <div class="footer-container">
                <div class="footer-grid">
                    <div class="footer-section">
                        <h3>Ateliê Joyce Serafim</h3>
                        <p>Moda feminina de qualidade com estilo e elegância. Vestidos, calças e blusas para todas as ocasiões.</p>
                    </div>
                    <div class="footer-section">
                        <h3>Contato</h3>
                        <p>📞 (11) 9999-9999<br>📧 contato@atelijoyce.com<br>📍 São Paulo, SP</p>
                    </div>
                    <div class="footer-section">
                        <h3>Informações</h3>
                        <ul>
                            <li><a href="#">Sobre Nós</a></li>
                            <li><a href="#">Política de Privacidade</a></li>
                            <li><a href="#">Termos de Serviço</a></li>
                            <li><a href="#">Fale Conosco</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Ateliê Joyce Serafim. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    `;
}

// Renderizar Home
function renderHome() {
    const filteredProducts = selectedCategory === 'todos' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === selectedCategory);
    
    return `
        ${renderHeader()}
        <div class="hero">
            <div class="hero-container">
                <h1>Bem-vindo ao Ateliê Joyce Serafim</h1>
                <p>Descubra nossa coleção exclusiva de moda feminina</p>
            </div>
        </div>
        
        <div class="container">
            <div class="category-filter">
                ${['todos', 'vestidos', 'calcas', 'blusas'].map(cat => `
                    <button class="category-btn ${selectedCategory === cat ? 'active' : ''}" 
                            onclick="filterCategory('${cat}')">
                        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                `).join('')}
            </div>
            
            <div class="products-grid">
                ${filteredProducts.map(product => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-content">
                            <div class="product-name">${product.name}</div>
                            <div class="product-description">${product.description}</div>
                            <div class="product-rating">
                                <span class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</span>
                                <span>(${product.reviews})</span>
                            </div>
                            <div class="product-footer">
                                <div class="product-price">R$ ${product.price.toFixed(2)}</div>
                                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">🛒</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        ${renderFooter()}
    `;
}

// Renderizar Login
function renderLogin() {
    return `
        ${renderHeader()}
        <div class="container">
            <div class="login-container">
                <div class="login-header">
                    <div class="login-header-icon">AJ</div>
                    <h1>Entrar</h1>
                    <p>Acesse sua conta Ateliê Joyce Serafim</p>
                </div>
                
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label>Email ou Usuário</label>
                        <input type="text" id="loginEmail" placeholder="seu@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="loginPassword" placeholder="Sua senha" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Entrar</button>
                </form>
                
                <div class="admin-hint">
                    <strong>Admin:</strong> Use "aDminisTrador143" como email e "AteLieJOyce" como senha
                </div>
                
                <div style="text-align: center; margin-top: 1.5rem;">
                    <p>Não tem conta? <a href="#" onclick="goToPage('register'); return false;" style="color: var(--primary); font-weight: bold;">Criar conta</a></p>
                </div>
            </div>
        </div>
        ${renderFooter()}
    `;
}

// Renderizar Register
function renderRegister() {
    return `
        ${renderHeader()}
        <div class="container">
            <div class="login-container">
                <div class="login-header">
                    <div class="login-header-icon">AJ</div>
                    <h1>Criar Conta</h1>
                    <p>Junte-se ao Ateliê Joyce Serafim</p>
                </div>
                
                <form onsubmit="handleRegister(event)">
                    <div class="form-group">
                        <label>Nome Completo</label>
                        <input type="text" id="registerName" placeholder="Seu nome" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="registerEmail" placeholder="seu@email.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Senha</label>
                        <input type="password" id="registerPassword" placeholder="Sua senha" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Confirmar Senha</label>
                        <input type="password" id="registerConfirmPassword" placeholder="Confirme sua senha" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Criar Conta</button>
                </form>
                
                <div style="text-align: center; margin-top: 1.5rem;">
                    <p>Já tem conta? <a href="#" onclick="goToPage('login'); return false;" style="color: var(--primary); font-weight: bold;">Entrar</a></p>
                </div>
            </div>
        </div>
        ${renderFooter()}
    `;
}

// Renderizar Carrinho
function renderCart() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `
        ${renderHeader()}
        <div class="container">
            <h1 style="margin-bottom: 2rem;">Meu Carrinho</h1>
            
            ${cart.length === 0 ? `
                <div style="text-align: center; padding: 3rem;">
                    <p style="font-size: 1.2rem; margin-bottom: 1rem;">Seu carrinho está vazio</p>
                    <button class="btn btn-primary" onclick="goToPage('home')">Continuar Comprando</button>
                </div>
            ` : `
                <div class="cart-container">
                    <div class="cart-items">
                        <h2 style="margin-bottom: 1rem;">Itens do Carrinho</h2>
                        ${cart.map((item, index) => `
                            <div class="cart-item">
                                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                                <div class="cart-item-details">
                                    <div class="cart-item-name">${item.name}</div>
                                    <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                                    <div class="cart-item-quantity">
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                                        <span>${item.quantity}</span>
                                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                                    </div>
                                </div>
                                <button class="remove-btn" onclick="removeFromCart(${index})">Remover</button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="cart-summary">
                        <h2 style="margin-bottom: 1rem;">Resumo</h2>
                        <div class="summary-row">
                            <span>Subtotal:</span>
                            <span>R$ ${total.toFixed(2)}</span>
                        </div>
                        <div class="summary-row">
                            <span>Frete:</span>
                            <span>Grátis</span>
                        </div>
                        <div class="summary-row total">
                            <span>Total:</span>
                            <span>R$ ${total.toFixed(2)}</span>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 1rem;" onclick="goToPage('checkout')">Ir para Checkout</button>
                    </div>
                </div>
            `}
        </div>
        ${renderFooter()}
    `;
}

// Renderizar Checkout
function renderCheckout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return `
        ${renderHeader()}
        <div class="container">
            <h1 style="margin-bottom: 2rem;">Checkout</h1>
            
            <div class="checkout-container">
                <div class="checkout-section">
                    <h2>Endereço de Entrega</h2>
                    <form>
                        <div class="form-group">
                            <label>Nome Completo</label>
                            <input type="text" placeholder="Seu nome" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="seu@email.com" required>
                        </div>
                        <div class="form-group">
                            <label>Endereço</label>
                            <input type="text" placeholder="Rua, número" required>
                        </div>
                        <div class="form-group">
                            <label>Cidade</label>
                            <input type="text" placeholder="São Paulo" required>
                        </div>
                        <div class="form-group">
                            <label>CEP</label>
                            <input type="text" placeholder="00000-000" required>
                        </div>
                    </form>
                </div>
                
                <div class="checkout-section">
                    <h2>Método de Pagamento</h2>
                    
                    <div class="payment-methods">
                        <label class="payment-method active">
                            <input type="radio" name="payment" value="card" checked>
                            <div class="payment-method-content">
                                <div class="payment-method-title">💳 Cartão de Débito</div>
                                <div class="payment-method-desc">Visa, Mastercard</div>
                            </div>
                        </label>
                        
                        <label class="payment-method">
                            <input type="radio" name="payment" value="pix">
                            <div class="payment-method-content">
                                <div class="payment-method-title">📱 Pix</div>
                                <div class="payment-method-desc">QR Code ou Chave Pix</div>
                            </div>
                        </label>
                    </div>
                    
                    <div id="cardPayment" style="display: block; margin-top: 1.5rem;">
                        <div class="form-group">
                            <label>Número do Cartão</label>
                            <input type="text" placeholder="0000 0000 0000 0000" maxlength="19" required>
                        </div>
                        <div class="form-group">
                            <label>Nome do Titular</label>
                            <input type="text" placeholder="JOÃO SILVA" required>
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                            <div class="form-group">
                                <label>Validade</label>
                                <input type="text" placeholder="MM/YY" maxlength="5" required>
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="text" placeholder="000" maxlength="3" required>
                            </div>
                        </div>
                    </div>
                    
                    <div id="pixPayment" style="display: none; margin-top: 1.5rem;">
                        <div class="qr-code-box">
                            <div style="font-size: 3rem;">📱</div>
                            <div style="font-weight: bold; margin-bottom: 0.5rem;">QR Code Pix</div>
                            <div style="font-size: 0.85rem; color: #666;">00020126580014br.gov.bcb.pix...</div>
                        </div>
                        <div class="pix-key">
                            <div class="pix-key-label">Chave Pix (CPF)</div>
                            <div class="pix-key-value">123.456.789-00</div>
                        </div>
                    </div>
                    
                    <div style="background-color: #FFF9E6; border-left: 4px solid var(--primary); padding: 1rem; border-radius: 4px; margin-top: 1.5rem;">
                        <strong style="color: var(--accent);">Total:</strong>
                        <div style="font-size: 1.8rem; color: var(--primary); font-weight: bold;">R$ ${total.toFixed(2)}</div>
                    </div>
                    
                    <button class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 1rem;" onclick="processPayment()">Finalizar Compra</button>
                </div>
            </div>
        </div>
        ${renderFooter()}
    `;
}

// Renderizar Admin
function renderAdmin() {
    return `
        ${renderHeader()}
        <div class="container">
            <div class="admin-container">
                <div class="admin-sidebar">
    