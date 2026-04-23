import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";

async function loadCheckoutPage() {
  try {
    await loadProductsFetch();
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  } catch (err) {
    console.error("Failed to load products");
    console.error(err.message);
  }
}
loadCheckoutPage();
