import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderOrders } from "../scripts/order.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";

async function loadOrdersPage() {
  await loadProducts();

  renderAmazonHeader();
  updateCartQuantity();
  renderOrders();
}
loadOrdersPage();
