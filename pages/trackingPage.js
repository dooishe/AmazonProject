import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderTracking } from "../scripts/tracking.js";

async function loadTrackingPage() {
  try {
    await loadProductsFetch();
    renderAmazonHeader();
    renderTracking();
  } catch (err) {
    console.error("Failed to load products");
    console.error(err.message);
  }
}
loadTrackingPage();
