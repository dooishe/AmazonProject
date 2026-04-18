import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderAmazon } from "../scripts/amazon/amazon.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";

async function loadAmazonPage() {
  await loadProducts();

  renderAmazonHeader();
  updateCartQuantity();
  renderAmazon();
}
loadAmazonPage();
