import { loadProductsFetch } from "../data/products.js";
import { renderAmazonHeader } from "../scripts/amazon/amazonHeader.js";
import { renderAmazon } from "../scripts/amazon/amazon.js";
import { updateCartQuantity } from "../scripts/utils/cart.js";

async function loadAmazonPage() {
  try {
    await loadProductsFetch();
  } catch (er) {
    console.log("Unexpected errorrr. Please try again later");
    console.log(er);
  }
  renderAmazonHeader();
  updateCartQuantity();
  renderAmazon();
}
loadAmazonPage();
