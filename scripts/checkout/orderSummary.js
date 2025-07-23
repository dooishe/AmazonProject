import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { centsToDollars } from "../utils/money.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {
  document.querySelector(".js-order-summary").innerHTML = cart
    .getCartItems()
    .map((cartItem) => {
      const matchingProduct = getProduct(cartItem.productId);
      const deliveryId = cartItem.deliveryOptionId;
      const deliveryOption = deliveryOptions.getDeliveryOption(deliveryId);
      const dateString = deliveryOptions.calculateDeliveryDate(deliveryOption);

      return ` <div class="js-cart-item-container-${matchingProduct.getId()} js-cart-item-container cart-item-container" data-product-id="${matchingProduct.getId()}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.getImage()}"
              />

              <div class="cart-item-details">
                <div class="product-name js-product-name-${matchingProduct.getId()}">
                  ${matchingProduct.getName()}
                </div>
                <div class="product-price js-product-price-${matchingProduct.getId()}">$${matchingProduct.getPrice()}</div>
                <div class="product-quantity
								js-product-quantity-${matchingProduct.getId()}">
                  <span> Quantity:<span class="js-quantity-label-${matchingProduct.getId()} quantity-label"> ${
        cartItem.quantity
      }</span> </span>
                  <span class="js-update-quantity-link update-quantity-link link-primary" data-product-id = "${matchingProduct.getId()}">
                    Update
                  </span>
									<input class="js-quantity-input-${matchingProduct.getId()} js-quantity-input quantity-input" data-product-id = "${matchingProduct.getId()}"></input>
									<span class="js-save-quantity-link js-save-quantity-link-${matchingProduct.getId()} save-quantity-link link-primary" data-product-id = "${matchingProduct.getId()}">Save</span>
                  <span class="js-delete-quantity-link delete-quantity-link link-primary js-delete-link-${matchingProduct.getId()}" 
									
									data-product-id = "${matchingProduct.getId()}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                ${renderDeliveryOptions(matchingProduct.getId(), cartItem)}
              </div>
            </div>
          </div>`;
    })
    .join("");
  makeEventListeners();
}
function renderDeliveryOptions(matchingProductId, cartItem) {
  let html = "";

  deliveryOptions.getDeliveryOptionsList().forEach((deliveryOption) => {
    const dateString = deliveryOptions.calculateDeliveryDate(deliveryOption);

    const priceString =
      deliveryOption.deliveryPrice === 0
        ? `FREE Shipping`
        : `$${centsToDollars(deliveryOption.deliveryPrice)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `<div class="delivery-option js-delivery-option js-delivery-option-${matchingProductId}-${
      deliveryOption.id
    }"
		data-product-id=${matchingProductId}
		data-delivery-id=${deliveryOption.id}>
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input js-delivery-option-input-${matchingProductId}-${
      deliveryOption.id
    }"
                    name="delivery-option-${matchingProductId}"
                  />
                  <div>
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">${priceString}</div>
                  </div>
                </div>`;
  });
  return html;
}

function makeEventListeners() {
  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteButton) => {
      deleteButton.addEventListener("click", () => {
        const productIdToDelete = deleteButton.dataset.productId;
        cart.deleteFromCart(productIdToDelete);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
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
      cart.updateQuantity(productId, inputValue);
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
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
  /*
  document
    .querySelector(".js-order-summary")
    .addEventListener("change", (element) => {
      const target = element.target;
      if (target.matches('input[type="radio"]')) {
        const product = target.closest(".cart-item-container");
        const productId = product.dataset.productId;
        const targetId = target.dataset.id;
        updateDeliveryId(productId, targetId);
        renderOrderSummary();
      }
    })*/
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const deliveryId = element.dataset.deliveryId;
      cart.updateDeliveryId(productId, deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
