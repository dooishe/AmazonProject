let cartQuantity = 0;
document.querySelector(".js-cart-quantity").textContent = `${cartQuantity}`;
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

          <div class="product-price">$${(item.priceCents / 100).toFixed(
            2
          )}</div>

          <div class="product-quantity-container">
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="js-add-to-cart-button add-to-cart-button button-primary"
					data-product-id='${item.id}'>Add to Cart</button>
        </div>`
    )
    .join("");
}
function addToCart() {
  document.querySelector(".js-cart-quantity").textContent = `${++cartQuantity}`;
}
function isNewProductInCart(productId) {
  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].productId === productId) {
      cartProducts[i].quantity += 1;
      return false;
    }
  }
  return true;
}
function makeEventListeners() {
  document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart();
      const productId = button.dataset.productId;
      if (isNewProductInCart(productId)) {
        cartProducts.push({
          productId: productId,
          quantity: 1,
        });
      }
      console.log(cartProducts);
    });
  });
}
renderHtml();
makeEventListeners();
