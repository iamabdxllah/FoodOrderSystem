// ---- Load cart from localStorage (set by menu module) ----
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const cartTotalSpan = document.getElementById("cartTotal");

function renderCart() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p class="empty-cart">Your cart is empty.</p>`;
    cartTotalSpan.innerText = "₹0";
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = "";

  cart.forEach(item => {
    const lineTotal = item.price * item.qty;
    total += lineTotal;
    cartItemsDiv.innerHTML += `
      <div class="cart-item">
        <span>${item.name} x${item.qty}</span>
        <span>₹${lineTotal}</span>
      </div>
    `;
  });

  cartTotalSpan.innerText = "₹" + total;
}

renderCart();

// ---- Place Order ----
const placeOrderBtn = document.getElementById("placeOrderBtn");
const confirmationSection = document.getElementById("confirmation");
const orderIdDisplay = document.getElementById("orderIdDisplay");
const orderSummaryText = document.getElementById("orderSummaryText");

function generateOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return "ORD-" + random;
}

placeOrderBtn.addEventListener("click", function () {
  // Exception: Cart is empty
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before placing an order.");
    return;
  }

  const address = document.getElementById("address").value.trim();
  const paymentMethod = document.getElementById("paymentMethod").value;

  // Exception: Missing delivery address
  if (address === "") {
    alert("Please enter a delivery address.");
    return;
  }

  // Exception: Missing payment method
  if (paymentMethod === "") {
    alert("Please select a payment method.");
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const orderId = generateOrderId();

  const order = {
    orderId: orderId,
    items: cart,
    total: total,
    address: address,
    paymentMethod: paymentMethod,
    status: "Placed",
    placedAt: new Date().toLocaleString()
  };

  // Save order for the Order Tracking module
  localStorage.setItem("currentOrder", JSON.stringify(order));

  // Clear cart after order is placed
  localStorage.removeItem("cart");
  cart = [];

  // Show confirmation
  orderIdDisplay.innerText = orderId;
  orderSummaryText.innerText =
    "Total: ₹" + total + " | Payment: " + paymentMethod + " | Delivering to: " + address;
  confirmationSection.classList.remove("hidden");

  placeOrderBtn.disabled = true;
  placeOrderBtn.style.opacity = "0.6";
});

// ---- Go to Tracking Page ----
document.getElementById("trackOrderBtn").addEventListener("click", function () {
  window.location.href = "tracking.html";
});
