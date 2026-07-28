const statuses = ["Placed", "Preparing", "Out For Delivery", "Delivered"];
const stepIds = ["step-placed", "step-preparing", "step-outfordelivery", "step-delivered"];
const lineIds = ["line-1", "line-2", "line-3"];

let currentStepIndex = 0;
let intervalId = null;

const trackBtn = document.getElementById("trackBtn");
const orderIdInput = document.getElementById("orderIdInput");
const trackingResult = document.getElementById("trackingResult");
const notFound = document.getElementById("notFound");
const resultOrderId = document.getElementById("resultOrderId");
const resultSummary = document.getElementById("resultSummary");
const currentStatusText = document.getElementById("currentStatusText");

function resetTimeline() {
  stepIds.forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove("active", "done");
  });
  lineIds.forEach(id => {
    document.getElementById(id).classList.remove("done");
  });
  currentStepIndex = 0;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function updateTimelineUI() {
  stepIds.forEach((id, index) => {
    const el = document.getElementById(id);
    el.classList.remove("active", "done");
    if (index < currentStepIndex) {
      el.classList.add("done");
    } else if (index === currentStepIndex) {
      el.classList.add("active");
    }
  });

  lineIds.forEach((id, index) => {
    const el = document.getElementById(id);
    if (index < currentStepIndex) {
      el.classList.add("done");
    } else {
      el.classList.remove("done");
    }
  });

  currentStatusText.innerText = "Current Status: " + statuses[currentStepIndex];
}

function startSimulatedTracking() {
  updateTimelineUI();

  intervalId = setInterval(function () {
    if (currentStepIndex < statuses.length - 1) {
      currentStepIndex++;
      updateTimelineUI();
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
  }, 4000); // status updates every 4 seconds
}

trackBtn.addEventListener("click", function () {
  const enteredId = orderIdInput.value.trim();

  // Exception: invalid/empty order ID
  if (enteredId === "") {
    alert("Please enter an Order ID.");
    return;
  }

  const order = JSON.parse(localStorage.getItem("currentOrder"));

  // Exception: order not found
  if (!order || order.orderId.toLowerCase() !== enteredId.toLowerCase()) {
    trackingResult.classList.add("hidden");
    notFound.classList.remove("hidden");
    return;
  }

  notFound.classList.add("hidden");
  trackingResult.classList.remove("hidden");

  resultOrderId.innerText = "Order ID: " + order.orderId;
  resultSummary.innerText =
    "Total: ₹" + order.total + " | Payment: " + order.paymentMethod +
    " | Delivering to: " + order.address;

  resetTimeline();
  startSimulatedTracking();
});

document.getElementById("backToMenuBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});
