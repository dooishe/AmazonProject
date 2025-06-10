import { products } from "../data/products.js";
import {
  cartProducts,
  deleteFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cartProducts.js";
import { centsToDollars } from "./utils/money.js";
function renderHtml() {
  document.querySelector(".js-order-summary").innerHTML = cartProducts
    .map((cartItem) => {
      const matchingProduct = products.find(
        (productItem) => productItem.id === cartItem.productId
      );
      return ` <div class="js-cart-item-container-${
        matchingProduct.id
      } cart-item-container">
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
                  <span> Quantity:<span class="js-quantity-label-${
                    matchingProduct.id
                  } quantity-label"> ${cartItem.quantity}</span> </span>
                  <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id = "${
                    matchingProduct.id
                  }">
                    Update
                  </span>
									<input class="js-quantity-input-${
                    matchingProduct.id
                  } js-quantity-input quantity-input" data-product-id = "${
        matchingProduct.id
      }"></input>
									<span class="js-save-quantity-link js-save-quantity-link-${
                    matchingProduct.id
                  } save-quantity-link link-primary" data-product-id = "${
        matchingProduct.id
      }">Save</span>
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
}
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(
    ".js-return-to-home-link"
  ).textContent = `${cartQuantity}`;
}
function makeEventListeners() {
  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const productIdToDelete = deleteButton.dataset.productId;
        deleteFromCart(productIdToDelete);
        document
          .querySelector(`.js-cart-item-container-${productIdToDelete} `)
          .remove();
        updateCartQuantity();
      });
    });
  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateButton) => {
      updateButton.addEventListener("click", () => {
        const productId = updateButton.dataset.productId;
        const container = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        container.classList.add("is-editing-quantity");
      });
    });
  document.querySelectorAll(".js-save-quantity-link").forEach((saveButton) => {
    saveButton.addEventListener("click", () => {
      const productId = saveButton.dataset.productId;
      const inputElement = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const inputValue = Number(inputElement.value);
      if (inputValue <= 0 || inputValue >= 1000 || !inputValue) {
        alert("input quantity atleast 1 and below 1000");
        return;
      }
      const productQuantityElement = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      productQuantityElement.textContent = inputValue;
      container.classList.remove("is-editing-quantity");
      updateQuantity(productId, inputValue);
      updateCartQuantity();
    });
  });
  document.querySelectorAll(".js-quantity-input").forEach((inputButton) => {
    inputButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const productId = inputButton.dataset.productId;
        document.querySelector(`.js-save-quantity-link-${productId}`).click();
      }
    });
  });
}
function init() {
  renderHtml();
  makeEventListeners();
  updateCartQuantity();
}
init();
