import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";

async function loadCheckoutPage() {
  await loadProducts();

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadCheckoutPage();
