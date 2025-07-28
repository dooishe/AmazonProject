import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { updateCartQuantity } from "./utils/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { renderAmazonHeader } from "./amazon/amazonHeader.js";
async function loadPage() {
  await loadProductsFetch();
  renderAmazonHeader();
  updateCartQuantity();
  renderTracking();
}
loadPage();
function renderTracking() {
  try {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    const productId = url.searchParams.get("productId");

    if (!orderId || !productId) {
      document.querySelector(".js-order-tracking").innerHTML = `
    <div class="error">Invalid tracking link: missing orderId or productId</div>`;
      return;
    }

    const productOrder = orders.getProduct(orderId, productId);
    const order = orders.getOrder(orderId);
    const product = getProduct(productId);

    if (!productOrder || !order || !product) {
      document.querySelector(".js-order-tracking").innerHTML = `
    <div class="error">Tracking data not found for this order.</div>`;
      return;
    }
    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productOrder.estimatedDeliveryTime);
    let deliveryPercent =
      ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    deliveryPercent = Math.min(Math.max(deliveryPercent, 0), 100);
    deliveryPercent = Math.floor(deliveryPercent);
    let currentStage = "";
    if (deliveryPercent < 50) {
      currentStage = "preparing";
    } else if (deliveryPercent < 100) {
      currentStage = "shipped";
    } else {
      currentStage = "delivered";
    }

    let arrivingDate;

    try {
      const deliveryOption = deliveryOptions.getDeliveryOptionFromTwoDates(
        order.orderTime,
        productOrder.estimatedDeliveryTime
      );
      arrivingDate = deliveryOptions.calculateDeliveryDate(
        deliveryOption,
        order.orderTime,
        "MMMM D"
      );
    } catch (error) {
      arrivingDate = "Couldn't find delivery date";
      console.error("Failed to calculate delivery date:", error);
    }
    document.querySelector(
      ".js-order-tracking"
    ).innerHTML = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${
          today.isBefore(deliveryTime) ? "Arriving on " : "Delivered on "
        }${arrivingDate}</div>

        <div class="product-info">
        </div>

        <div class="product-info">Quantity: ${productOrder.quantity}</div>
        <img
       arrivingDateFormatte   class="product-image"
          src="${product.getImage()}"
        />

        <div class="progress-labels-container">
          <div class="progress-label ${
            currentStage === "preparing" ? "current-status" : ""
          }">Preparing</div>
          <div class="progress-label ${
            currentStage === "shipped" ? "current-status" : ""
          }">Shipped</div>
          <div class="progress-label ${
            currentStage === "delivered" ? "current-status" : ""
          }">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${deliveryPercent}%"></div>
        </div>`;
  } catch (error) {
    console.error("Failed to render the page:", error);
  }
}
