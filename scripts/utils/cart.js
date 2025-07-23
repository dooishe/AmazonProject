import { cart } from "../../data/cart.js";
const CART_QUANTITY_SELECTOR = ".js-cart-quantity";
export function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector(CART_QUANTITY_SELECTOR).textContent = cartQuantity;
}
