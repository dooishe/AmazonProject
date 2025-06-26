import { products } from "../data/products.js";
import { addToCart, calculateCartQuantity } from "../data/cartProducts.js";
import money from "./utils/money.js";
function renderHtml() {
  document.querySelector(".js-products-grid").innerHTML = products
    .map(
      (item) =>
        ` <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${item.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${item.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${item.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              item.rating.count
            }</div>
          </div>

          <div class="product-price">$${money.centsToDollars(
            item.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${item.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart${item.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="js-add-to-cart-button add-to-cart-button button-primary"
					data-product-id='${item.id}'>Add to Cart</button>
        </div>`
    )
    .join("");
}
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  document.querySelector(".js-cart-quantity").textContent = `${cartQuantity}`;
}
function makeEventListeners() {
  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    let addedMessageTimeoutId;
    button.addEventListener("click", () => {
      let timeoutId;
      const { productId } = button.dataset;
      const quantity = Number(
        document.querySelector(`.js-quantity-selector-${productId}`).value
      );
      addToCart(productId, quantity);
      updateCartQuantity();
      const addTextAddedElement = document.querySelector(
        `.js-added-to-cart${productId}`
      );
      if (addTextAddedElement.classList.contains("added-to-cart-visible")) {
        clearTimeout(addedMessageTimeoutId);
        timeoutId = setTimeout(() => {
          addTextAddedElement.classList.remove("added-to-cart-visible");
        }, 2000);
      } else {
        addTextAddedElement.classList.add("added-to-cart-visible");
        timeoutId = setTimeout(() => {
          addTextAddedElement.classList.remove("added-to-cart-visible");
        }, 2000);
      }
      addedMessageTimeoutId = timeoutId;
    });
  });
}
function init() {
  renderHtml();
  makeEventListeners();
  updateCartQuantity();
}
init();
