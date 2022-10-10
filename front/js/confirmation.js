const url = new URL(window.location);
const id = url.searchParams.get("orderId");

const orderId = document.getElementById("orderId");
// console.log(orderId);
orderId.textContent = id;
