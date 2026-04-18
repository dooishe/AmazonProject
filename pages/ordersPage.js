import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderOrders } from "../scripts/order.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";

async function loadOrdersPage() {
  try {
    await loadProductsFetch();
  } catch (er) {
    console.log("Unexpected error. Please try again later");
    console.log(er);
  }
  renderAmazonHeader();
  updateCartQuantity();
  renderOrders();
}
loadOrdersPage();
