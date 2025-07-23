import { orders } from "../data/orders.js";
import { centsToDollars } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
async function loadPage() {
  try {
    await loadProductsFetch();
  } catch (er) {
    console.log("Unexpected error. Please try again later");
    console.log(er);
  }
  updateCartQuantity();
  renderOrders();
}
loadPage();

function renderOrders() {
  document.querySelector(".js-orders").innerHTML = orders
    .getOrders()
    .map((order) => {
      const formattedPlacedDate = dayjs(order.orderTime).format("MMMM D");
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
  makeEventListeners();
}
function renderOrder(orderProducts) {
  let orderHTML = orderProducts
    .map((product) => {
      const matchingProduct = getProduct(product.productId);
      const formattedDeliveryDate = dayjs(product.estimatedDeliveryTime).format(
        "MMMM D"
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
              <button class="js-buy-again-button buy-again-button button-primary"
							data-product-id=${product.productId}
							data-quantity=${product.quantity}>
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
  //здесь возможная проблема обновления количества товаров в корзине на 3
  document.querySelector(".js-cart-quantity").innerText =
    cart.calculateCartQuantity();
}
function makeEventListeners() {
  document
    .querySelectorAll(".js-buy-again-button")
    .forEach((buyAgainButton) => {
      buyAgainButton.addEventListener("click", () => {
        const productId = buyAgainButton.dataset.productId;
        const quantityString = buyAgainButton.dataset.quantity;
        cart.addToCart(productId, Number(quantityString));
        updateCartQuantity();
      });
    });
}
