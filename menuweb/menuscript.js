const menuItems = [{
        id: 1,
        name: 'Hamburguesa Clásica',
        price: 25000,
        category: 'hamburguesas',
        popular: true,
        image: 'https://via.placeholder.com/400x300.png?text=Burger+1'
    },
    {
        id: 2,
        name: 'Alitas BBQ (8 pz)',
        price: 32000,
        category: 'alitas',
        popular: true,
        image: 'https://via.placeholder.com/400x300.png?text=Alitas+BBQ'
    },
    {
        id: 3,
        name: 'Papas a la francesa',
        price: 8000,
        category: 'papas',
        popular: false,
        image: 'https://via.placeholder.com/400x300.png?text=Papas+Fritas'
    },
    {
        id: 4,
        name: 'Mojito de Lulo',
        price: 18000,
        category: 'cocteles',
        popular: false,
        image: 'https://via.placeholder.com/400x300.png?text=Mojito+Lulo'
    },
    {
        id: 5,
        name: 'Cerveza Club Colombia',
        price: 7000,
        category: 'cervezas',
        popular: false,
        image: 'https://via.placeholder.com/400x300.png?text=Cerveza'
    },
    {
        id: 6,
        name: 'Jugo de Maracuyá',
        price: 6000,
        category: 'jugos',
        popular: false,
        image: 'https://via.placeholder.com/400x300.png?text=Jugo'
    },
    {
        id: 7,
        name: 'Mojito de mango',
        price: 6000,
        category: 'cocteles',
        popular: true,
        image: '../img/LogoPrincipal.jpg'
    }
];

const menuGrid = document.querySelector('.menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const orderItemsContainer = document.querySelector('.order-items');
const totalPriceElement = document.getElementById('total-price');
const orderBox = document.querySelector('.order-box');

let order = [];
let total = 0;

function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

function renderMenuItems(items) {
    menuGrid.innerHTML = '';
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('menu-item');
        itemDiv.setAttribute('data-id', item.id);

        itemDiv.innerHTML = `
            <div class="item-image-container">
                <img src="${item.image}" alt="${item.name}">
                ${item.popular ? '<span class="popular-tag">Popular</span>' : ''}
            </div>
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-price">${formatPrice(item.price)}</p>
            </div>
        `;
        menuGrid.appendChild(itemDiv);
    });
}

function filterItems(category) {
    const filteredItems = category === 'todos' ? menuItems : menuItems.filter(item => item.category === category);
    renderMenuItems(filteredItems);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterItems(btn.getAttribute('data-category'));
    });
});

document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems(menuItems);
});

menuGrid.addEventListener('click', (e) => {
    const itemCard = e.target.closest('.menu-item');
    if (itemCard) {
        const itemId = parseInt(itemCard.getAttribute('data-id'));
        const itemToAdd = menuItems.find(item => item.id === itemId);
        
        if (itemToAdd) {
            order.push(itemToAdd);
            updateOrderSummary();
        }
    }
});

function updateOrderSummary() {
    orderItemsContainer.innerHTML = '';
    total = 0;
    
    order.forEach((item, index) => {
        const orderItemDiv = document.createElement('div');
        orderItemDiv.classList.add('order-item');
        orderItemDiv.setAttribute('data-index', index);
        orderItemDiv.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">${formatPrice(item.price)}</span>
            <button class="remove-item-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        orderItemsContainer.appendChild(orderItemDiv);
        total += item.price;
    });
    
    totalPriceElement.textContent = formatPrice(total);
}

orderItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn') || e.target.closest('.remove-item-btn')) {
        const btn = e.target.closest('.remove-item-btn');
        const itemIndex = parseInt(btn.getAttribute('data-index'));
        
        order.splice(itemIndex, 1);
        updateOrderSummary();
    }
});