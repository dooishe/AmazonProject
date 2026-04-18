import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";
import { renderTracking } from "../scripts/tracking.js";

async function loadTrackingPage() {
  try {
    await loadProductsFetch();
  } catch (er) {
    console.log("Unexpected error. Please try again later");
    console.log(er);
  }
  renderAmazonHeader();
  updateCartQuantity();
  renderTracking();
}
loadTrackingPage();
