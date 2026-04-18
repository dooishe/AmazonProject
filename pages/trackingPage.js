import { loadProducts } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";
import { renderTracking } from "../scripts/tracking.js";

async function loadTrackingPage() {
  await loadProducts();

  renderAmazonHeader();
  updateCartQuantity();
  renderTracking();
}
loadTrackingPage();
