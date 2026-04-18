import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderAmazon } from "../scripts/amazon/amazon.js";

async function loadAmazonPage() {
  await loadProducts();

  renderAmazonHeader();
  renderAmazon();
}
loadAmazonPage();
