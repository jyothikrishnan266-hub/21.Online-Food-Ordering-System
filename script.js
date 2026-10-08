// ===============================
// DATA
// ===============================

const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Pizza • Italian",
    rating: 4.6,
    delivery: "25-30 min",
    image: "🍕",
    menu: [
      {
        id: 101,
        name: "Margherita Pizza",
        description: "Classic cheese and tomato pizza",
        price: 249,
        image: "🍕"
      },
      {
        id: 102,
        name: "Farmhouse Pizza",
        description: "Loaded with fresh vegetables",
        price: 349,
        image: "🍕"
      },
      {
        id: 103,
        name: "Paneer Pizza",
        description: "Spicy paneer with mozzarella",
        price: 329,
        image: "🍕"
      },
      {
        id: 104,
        name: "Garlic Bread",
        description: "Freshly baked garlic bread",
        price: 149,
        image: "🥖"
      }
    ]
  },

  {
    id: 2,
    name: "Burger Hub",
    cuisine: "Burgers • Fast Food",
    rating: 4.4,
    delivery: "20-25 min",
    image: "🍔",
    menu: [
      {
        id: 201,
        name: "Classic Burger",
        description: "Crispy patty with fresh vegetables",
        price: 159,
        image: "🍔"
      },
      {
        id: 202,
        name: "Cheese Burger",
        description: "Classic burger with extra cheese",
        price: 199,
        image: "🍔"
      },
      {
        id: 203,
        name: "Veggie Burger",
        description: "Healthy and delicious vegetable patty",
        price: 179,
        image: "🥪"
      },
      {
        id: 204,
        name: "French Fries",
        description: "Crispy golden potato fries",
        price: 99,
        image: "🍟"
      }
    ]
  },

  {
    id: 3,
    name: "Biryani House",
    cuisine: "Indian • Biryani",
    rating: 4.8,
    delivery: "30-35 min",
    image: "🍛",
    menu: [
      {
        id: 301,
        name: "Veg Biryani",
        description: "Aromatic basmati rice with vegetables",
        price: 219,
        image: "🍛"
      },
      {
        id: 302,
        name: "Paneer Biryani",
        description: "Biryani with spicy paneer pieces",
        price: 269,
        image: "🍛"
      },
      {
        id: 303,
        name: "Chicken Biryani",
        description: "Traditional chicken dum biryani",
        price: 329,
        image: "🍗"
      },
      {
        id: 304,
        name: "Raita",
        description: "Fresh creamy cucumber raita",
        price: 69,
        image: "🥣"
      }
    ]
  },

  {
    id: 4,
    name: "Sweet Corner",
    cuisine: "Desserts • Beverages",
    rating: 4.5,
    delivery: "15-20 min",
    image: "🍰",
    menu: [
      {
        id: 401,
        name: "Chocolate Cake",
        description: "Rich chocolate layered cake",
        price: 179,
        image: "🍰"
      },
      {
        id: 402,
        name: "Ice Cream",
        description: "Creamy vanilla ice cream",
        price: 99,
        image: "🍨"
      },
      {
        id: 403,
        name: "Chocolate Brownie",
        description: "Warm chocolate brownie",
        price: 129,
        image: "🍫"
      },
      {
        id: 404,
        name: "Cold Coffee",
        description: "Chilled creamy cold coffee",
        price: 119,
        image: "🥤"
      }
    ]
  }
];


// ===============================
// VARIABLES
// ===============================

let cart = [];
let selectedRestaurant = null;


// ===============================
// DISPLAY RESTAURANTS
// ===============================

function displayRestaurants(data = restaurants) {

  const restaurantList = document.getElementById("restaurantList");

  restaurantList.innerHTML = "";

  if (data.length === 0) {
    restaurantList.innerHTML =
      `<p class="empty-message">No restaurants found.</p>`;
    return;
  }

  data.forEach(restaurant => {

    const card = document.createElement("div");

    card.className = "restaurant-card";

    card.innerHTML = `
      <div class="restaurant-image">
        ${restaurant.image}
      </div>

      <div class="restaurant-info">
        <h3>${restaurant.name}</h3>

        <p>
          ${restaurant.cuisine}<br>
          ⭐ ${restaurant.rating} • ${restaurant.delivery}
        </p>

        <button onclick="openMenu(${restaurant.id})">
          View Menu
        </button>
      </div>
    `;

    restaurantList.appendChild(card);
  });
}


// ===============================
// OPEN MENU
// ===============================

function openMenu(restaurantId) {

  selectedRestaurant =
    restaurants.find(r => r.id === restaurantId);

  document.getElementById("restaurants")
    .classList.add("hidden");

  document.getElementById("menuSection")
    .classList.remove("hidden");

  document.getElementById("menuRestaurantName")
    .textContent = selectedRestaurant.name;

  document.getElementById("menuRestaurantInfo")
    .textContent =
    `${selectedRestaurant.cuisine} • ⭐ ${selectedRestaurant.rating} • ${selectedRestaurant.delivery}`;

  displayMenu(selectedRestaurant.menu);

  document.getElementById("menuSection")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// ===============================
// DISPLAY MENU
// ===============================

function displayMenu(menu) {

  const menuList =
    document.getElementById("menuList");

  menuList.innerHTML = "";

  menu.forEach(item => {

    const card = document.createElement("div");

    card.className = "menu-card";

    card.innerHTML = `
      <div class="food-image">
        ${item.image}
      </div>

      <div class="menu-info">
        <h3>${item.name}</h3>

        <p>${item.description}</p>

        <span class="price">
          ₹${item.price}
        </span>

        <br>

        <button
          class="add-btn"
          onclick="addToCart(${selectedRestaurant.id}, ${item.id})">
          + Add
        </button>
      </div>
    `;

    menuList.appendChild(card);
  });
}


// ===============================
// CLOSE MENU
// ===============================

function closeMenu() {

  document.getElementById("menuSection")
    .classList.add("hidden");

  document.getElementById("restaurants")
    .classList.remove("hidden");

  document.getElementById("restaurants")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(restaurantId, itemId) {

  const restaurant =
    restaurants.find(r => r.id === restaurantId);

  const item =
    restaurant.menu.find(i => i.id === itemId);

  const existing =
    cart.find(c => c.id === itemId);

  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      ...item,
      restaurantName: restaurant.name,
      quantity: 1
    });

  }

  updateCart();

  alert(`${item.name} added to cart!`);
}


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

  const cartCount =
    document.getElementById("cartCount");

  const count =
    cart.reduce((sum, item) =>
      sum + item.quantity, 0);

  cartCount.textContent = count;
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

  renderCart();

  document.getElementById("cartModal")
    .classList.add("active");
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

  document.getElementById("cartModal")
    .classList.remove("active");
}


// ===============================
// RENDER CART
// ===============================

function renderCart() {

  const cartItems =
    document.getElementById("cartItems");

  cartItems.innerHTML = "";

  if (cart.length === 0) {

    cartItems.innerHTML =
      `<p class="empty-message">
        Your cart is empty.
      </p>`;

    document.getElementById("subtotal")
      .textContent = "₹0";

    document.getElementById("total")
      .textContent = "₹0";

    return;
  }

  cart.forEach(item => {

    const div =
      document.createElement("div");

    div.className = "cart-item";

    div.innerHTML = `

      <div class="food-image">
        ${item.image}
      </div>

      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
      </div>

      <div class="quantity">

        <button onclick="changeQuantity(${item.id}, -1)">
          −
        </button>

        <span>${item.quantity}</span>

        <button onclick="changeQuantity(${item.id}, 1)">
          +
        </button>

      </div>

      <button
        class="remove-btn"
        onclick="removeFromCart(${item.id})">
        🗑
      </button>
    `;

    cartItems.appendChild(div);
  });

  calculateBill();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(id, amount) {

  const item =
    cart.find(i => i.id === id);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  updateCart();
  renderCart();
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  updateCart();
  renderCart();
}


// ===============================
// BILL CALCULATION
// ===============================

function calculateBill() {

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

  const deliveryFee =
    subtotal > 0 ? 40 : 0;

  const total =
    subtotal + deliveryFee;

  document.getElementById("subtotal")
    .textContent = `₹${subtotal}`;

  document.getElementById("deliveryFee")
    .textContent = `₹${deliveryFee}`;

  document.getElementById("total")
    .textContent = `₹${total}`;
}


// ===============================
// CHECKOUT
// ===============================

function openCheckout() {

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;
  }

  closeCart();

  document.getElementById("checkoutModal")
    .classList.add("active");
}


function closeCheckout() {

  document.getElementById("checkoutModal")
    .classList.remove("active");
}


// ===============================
// PLACE ORDER
// ===============================

function placeOrder(event) {

  event.preventDefault();

  if (cart.length === 0) {

    alert("Your cart is empty!");

    return;
  }

  const name =
    document.getElementById("customerName").value;

  const phone =
    document.getElementById("phone").value;

  const address =
    document.getElementById("address").value;

  const payment =
    document.querySelector(
      'input[name="payment"]:checked'
    ).value;

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

  const total = subtotal + 40;

  const order = {

    id:
      "FD" +
      Math.floor(
        100000 +
        Math.random() * 900000
      ),

    date:
      new Date().toLocaleString(),

    customer: name,

    phone: phone,

    address: address,

    payment: payment,

    items: [...cart],

    total: total,

    status: "Confirmed"
  };


  // Save order to browser

  let orders =
    JSON.parse(
      localStorage.getItem("foodOrders")
    ) || [];

  orders.unshift(order);

  localStorage.setItem(
    "foodOrders",
    JSON.stringify(orders)
  );


  // Clear cart

  cart = [];

  updateCart();

  closeCheckout();

  document.getElementById("checkoutForm")
    .reset();


  // Success message

  document.getElementById("successMessage")
    .textContent =
    `Order ${order.id} has been confirmed. Total amount: ₹${order.total}`;

  document.getElementById("successModal")
    .classList.add("active");


  displayOrders();
}


// ===============================
// CLOSE SUCCESS
// ===============================

function closeSuccess() {

  document.getElementById("successModal")
    .classList.remove("active");

  document.getElementById("orders")
    .scrollIntoView({
      behavior: "smooth"
    });
}


// ===============================
// DISPLAY ORDER HISTORY
// ===============================

function displayOrders() {

  const container =
    document.getElementById("orderHistory");

  const orders =
    JSON.parse(
      localStorage.getItem("foodOrders")
    ) || [];

  if (orders.length === 0) {

    container.innerHTML =
      `<p class="empty-message">
        No orders yet.
      </p>`;

    return;
  }

  container.innerHTML = "";

  orders.forEach(order => {

    const div =
      document.createElement("div");

    div.className = "order-card";

    const items =
      order.items
        .map(item =>
          `<li>
            ${item.name} × ${item.quantity}
          </li>`
        )
        .join("");

    div.innerHTML = `

      <div class="order-top">
        <div>
          <strong>Order #${order.id}</strong>
          <p>${order.date}</p>
        </div>

        <span class="status">
          ✓ ${order.status}
        </span>
      </div>

      <p>
        <strong>Customer:</strong>
        ${order.customer}
      </p>

      <p>
        <strong>Payment:</strong>
        ${order.payment}
      </p>

      <ul>
        ${items}
      </ul>

      <p class="order-total">
        Total: ₹${order.total}
      </p>
    `;

    container.appendChild(div);
  });
}


// ===============================
// SEARCH
// ===============================

function searchFood() {

  const query =
    document.getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();

  if (!query) {

    displayRestaurants();

    return;
  }

  const filteredRestaurants =
    restaurants.filter(restaurant => {

      const restaurantMatch =
        restaurant.name
          .toLowerCase()
          .includes(query) ||
        restaurant.cuisine
          .toLowerCase()
          .includes(query);

      const foodMatch =
        restaurant.menu.some(item =>
          item.name
            .toLowerCase()
            .includes(query)
        );

      return restaurantMatch || foodMatch;
    });

  displayRestaurants(filteredRestaurants);
}


// ===============================
// INITIALIZE
// ===============================

displayRestaurants();

displayOrders();

updateCart();