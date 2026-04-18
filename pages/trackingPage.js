import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderTracking } from "../scripts/tracking.js";

async function loadTrackingPage() {
  await loadProducts();

  renderAmazonHeader();
  renderTracking();
}
loadTrackingPage();
