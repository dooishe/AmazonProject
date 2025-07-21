import { getProduct } from "../../data/products.js";
import { cart } from "../../data/cart.js";
import { centsToDollars } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { orders } from "../../data/orders.js";
export function renderPaymentSummary() {
  const cartQuantity = cart.calculateCartQuantity();
  let productsPriceCents = 0;
  let totalShippingAndHandlingCents = 0;
  cart.getCartItems().forEach((cartItem) => {
    const matchingProductObject = getProduct(cartItem.productId);
    const matchingDataObject = deliveryOptions.getDeliveryOption(
      cartItem.deliveryId
    );
    productsPriceCents +=
      cartItem.quantity * matchingProductObject.getPriceCents();
    totalShippingAndHandlingCents += matchingDataObject.deliveryPrice;
  });
  let totalBeforeTaxCents = productsPriceCents + totalShippingAndHandlingCents;
  let estimatedTaxCents = totalBeforeTaxCents * 0.1;
  const totalPriceCents = totalBeforeTaxCents + estimatedTaxCents;
  document.querySelector(
    ".js-payment-summary"
  ).innerHTML = `<div class="payment-summary-title">Order Summary</div>
          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money ">$${centsToDollars(
              productsPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-shipping-and-handling">$${centsToDollars(
              totalShippingAndHandlingCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centsToDollars(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centsToDollars(
              estimatedTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-total-price">$${centsToDollars(
              totalPriceCents
            )}</div>
          </div>

          <button class="js-place-order-button place-order-button button-primary">
            Place your order
          </button>`;
  makeEventListeners();
}
function makeEventListeners() {
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      try {
        if (cart.getCartItems().length === 0) return;
        const response = await fetch("https://supersimplebackend.dev/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: cart.getCartItems() }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const order = await response.json();
        orders.addOrder(order);
        window.location.href = "/orders.html";
      } catch (error) {
        console.log("Error! can't make order");
        console.log(error);
      }
    });
}
