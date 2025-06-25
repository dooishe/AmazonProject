import { products } from "../../data/products.js";
import {
  cartProducts,
  deleteFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryId,
} from "../../data/cartProducts.js";
import {
  deliveryOptions,
  findMatchingDeliveryObject,
} from "../../data/deliveryOptions.js";
import money from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function renderHtml() {
  document.querySelector(".js-order-summary").innerHTML = cartProducts
    .map((cartItem) => {
      const matchingProduct = products.find(
        (productItem) => productItem.id === cartItem.productId
      );
      const deliveryId = cartItem.deliveryId;
      const deliveryTime = `${
        findMatchingDeliveryObject(deliveryId).deliveryTime
      }`;
      const today = dayjs();
      const deliveryDate = today.add(deliveryTime, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      return ` <div class="js-cart-item-container-${
        matchingProduct.id
      } cart-item-container" data-product-id="${matchingProduct.id}">
            <div class="delivery-date">Delivery date: ${dateString}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingProduct.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">$${money.centsToDollars(
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
                ${renderDeliveryOptions(matchingProduct.id, cartItem)}
              </div>
            </div>
          </div>`;
    })
    .join("");
  makeEventListeners();
}
function renderDeliveryOptions(matchingProductId, cartItem) {
  let html = "";

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.deliveryPrice === 0
        ? `FREE Shipping`
        : `$${money.centsToDollars(deliveryOption.deliveryPrice)}`;
    const isChecked = deliveryOption.id === cartItem.deliveryId;
    html += `<div class="delivery-option js-delivery-option"
		data-product-id=${matchingProductId}
		data-delivery-id=${deliveryOption.id}>
                  <input
                    type="radio"
                    ${isChecked ? "checked" : ""}
                    class="delivery-option-input"
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
      renderHtml();
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
        renderHtml();
      }
    })*/
  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const productId = element.dataset.productId;
      const elementId = element.dataset.deliveryId;
      updateDeliveryId(productId, elementId);
      renderHtml();
    });
  });
}
export function init() {
  renderHtml();
  makeEventListeners();
  updateCartQuantity();
}
