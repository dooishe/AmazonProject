import { products } from "../data/products.js";
import { cartProducts, deleteFromCart } from "../data/cartProducts.js";
import { centsToDollars } from "./utils/money.js";
function renderHtml() {
  if (!cartProducts) {
    document.querySelector(".js-order-summary").innerHTML = "<div></div>";
    console.log("в корзине ничего нет");
    return;
  }
  console.log("рендер");
  document.querySelector(".js-order-summary").innerHTML = cartProducts
    .map((cartItem) => {
      const matchingProduct = products.find(
        (productItem) => productItem.id === cartItem.productId
      );
      return ` <div class="cart-item-container">
            <div class="delivery-date">Delivery date: Tuesday, June 21</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${centsToDollars(
                  matchingProduct.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="js-delete-quantity-link delete-quantity-link link-primary" data-product-id = "${
                    matchingProduct.id
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">FREE Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">$4.99 - Shipping</div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input
                    type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}"
                  />
                  <div>
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">$9.99 - Shipping</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    })
    .join("");
  makeEventListeners();
}
function makeEventListeners() {
  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        console.log("клик на кнопку делит");
        const productIdToDelete = deleteButton.dataset.productId;
        deleteFromCart(productIdToDelete);
        renderHtml();
      });
    });
}
function init() {
  renderHtml();
  makeEventListeners();
}
init();
