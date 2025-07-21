class Order {
  #orders;
  constructor() {
    this.#loadFromLocalStorage();
  }
  #loadFromLocalStorage() {
    this.#orders = JSON.parse(localStorage.getItem("orders")) || [];
  }
  addOrder(order) {
    this.#orders.unshift(order);
    this.#saveToLocalStorage();
  }
  #saveToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(this.#orders));
  }
  getOrders() {
    return this.#orders;
  }
}
export const orders = new Order();
