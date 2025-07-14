import { cart } from "../../data/cart.js";
export function renderCheckoutHeader() {
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector(
    ".js-checkout-header"
  ).innerHTML = `<div class="header-content">
        <div class="checkout-header-left-section">
          <a href="amazon.html">
            <img class="amazon-logo" src="images/amazon-logo.png" />
            <img
              class="amazon-mobile-logo"
              src="images/amazon-mobile-logo.png"
            />
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a
            class="js-return-to-home-link return-to-home-link"
            href="amazon.html"
          >${cartQuantity}</a
          >)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png" />
        </div>
      </div>`;
}
