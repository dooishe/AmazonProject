export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  console.log(orders);
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
