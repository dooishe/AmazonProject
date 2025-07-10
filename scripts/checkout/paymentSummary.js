import { getProduct } from "../../data/products.js";
import {
  cartProducts,
  calculateCartQuantity,
} from "../../data/cartProducts.js";
import { centsToDollars } from "../utils/money.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  const cartQuantity = calculateCartQuantity();
  let productsPriceCents = 0;
  let totalShippingAndHandlingCents = 0;
  cartProducts.forEach((cartItem) => {
    const matchingProductObject = getProduct(cartItem.productId);
    const matchingDataObject = getDeliveryOption(cartItem.deliveryId);
    productsPriceCents += cartItem.quantity * matchingProductObject.priceCents;
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
}
