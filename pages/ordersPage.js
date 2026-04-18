import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderOrders } from "../scripts/order.js";

async function loadOrdersPage() {
  await loadProducts();

  renderAmazonHeader();
  renderOrders();
}
loadOrdersPage();
