import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderAmazon } from "../scripts/amazon/amazon.js";

async function loadAmazonPage() {
  try {
    await loadProductsFetch();
    renderAmazonHeader();
    renderAmazon();
  } catch (err) {
    console.error("Failed to load products");
    console.error(err.message);
  }
}
loadAmazonPage();
