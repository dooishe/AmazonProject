import { products } from "../data/products.js";
import { cart } from "../data/cart.js";
function renderHtml() {
  document.querySelector(".js-products-grid").innerHTML = products
    .map(
      (product) =>
        ` <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src=${product.getStarsUrl()}
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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
					${product.extraInfoHtml()}
          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="js-add-to-cart-button add-to-cart-button button-primary"
					data-product-id='${product.id}'>Add to Cart</button>
        </div>`
    )
    .join("");
}
function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
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
      cart.addToCart(productId, quantity);
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
