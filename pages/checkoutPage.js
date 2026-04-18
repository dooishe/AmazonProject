import { renderOrderSummary } from "../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
import { renderCheckoutHeader } from "../scripts/checkout/checkoutHeader.js";
import { loadProductsFetch } from "../data/products.js";

async function loadCheckoutPage() {
  try {
    await loadProductsFetch();
  } catch (er) {
    console.log("Unexpected errorrr. Please try again later");
    console.log(er);
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadCheckoutPage();
