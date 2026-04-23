import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderOrders } from "../scripts/order.js";

async function loadOrdersPage() {
  try {
    await loadProductsFetch();
    renderAmazonHeader();
    renderOrders();
  } catch (err) {
    console.error("Failed to load products");
    console.error(err.message);
  }
}
loadOrdersPage();
