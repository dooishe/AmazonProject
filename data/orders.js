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
  getOrder(orderId) {
    let matchingOrder;
    orders.getOrders().forEach((order) => {
      if (order.id === orderId) matchingOrder = order;
    });
    return matchingOrder;
  }
  getProduct(orderId, productId) {
    let matchingOrder;
    let matchingProduct;
    orders.getOrders().forEach((order) => {
      if (order.id === orderId) matchingOrder = order;
    });
    matchingOrder.products.forEach((product) => {
      if (product.productId === productId) matchingProduct = product;
    });
    return matchingProduct;
  }
}
export const orders = new Order();
