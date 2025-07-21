import { orders } from "../data/orders.js";
import { formatIsoToMonthDay } from "./utils/day.js";
import { centsToDollars } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";
loadProductsFetch().then(() => {
  updateCartQuantity();
  renderOrders();
});

console.log(orders.getOrders());
function renderOrders() {
  document.querySelector(".js-orders").innerHTML = orders
    .getOrders()
    .map((order) => {
      const formattedPlacedDate = formatIsoToMonthDay(order.orderTime);
      return `
      <div class="orders-grid">
        <div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formattedPlacedDate}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${centsToDollars(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${renderOrder(order.products)}
          </div>
        </div>
				
`;
    })
    .join("");
}
function renderOrder(orderProducts) {
  let orderHTML = orderProducts
    .map((product) => {
      const matchingProduct = getProduct(product.productId);
      const formattedDeliveryDate = formatIsoToMonthDay(
        product.estimatedDeliveryTime
      );
      return `<div class="product-image-container">
              <img src=${matchingProduct.getImage()} />
            </div>

            <div class="product-details">
              <div class="product-name">
               ${matchingProduct.getName()}
              </div>
              <div class="product-delivery-date">Arriving on: ${formattedDeliveryDate}</div>
              <div class="product-quantity">Quantity: ${product.quantity}</div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png" />
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
`;
    })
    .join("");
  return orderHTML;
}
function updateCartQuantity() {
  document.querySelector(".js-cart-quantity").innerText =
    cart.calculateCartQuantity();
}
