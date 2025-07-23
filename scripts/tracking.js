import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "./utils/cart.js";
async function loadPage() {
  await loadProductsFetch();
  renderTracking();
  updateCartQuantity();
}
loadPage();
function renderTracking() {
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  const productOrder = orders.getMatchingProduct(orderId, productId);
  const product = getProduct(productId);
  const arrivingDate = dayjs(productOrder.estimatedDeliveryTime).format(
    "dddd, MMMM D"
  );
  document.querySelector(
    ".js-order-tracking"
  ).innerHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${arrivingDate}</div>

        <div class="product-info">
        </div>

        <div class="product-info">Quantity: ${productOrder.quantity}</div>

        <img
          class="product-image"
          src="${product.getImage()}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
}
