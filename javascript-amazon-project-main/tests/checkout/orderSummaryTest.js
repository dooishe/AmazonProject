import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cartProducts.js";
import { cartProducts } from "../../data/cartProducts.js";
describe("test suite: renderOrderSummary", () => {
  const productId1 = "efafasdfewafaw-sdfasf-1213sef-43";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  beforeEach(() => {
    const container = document.querySelector(".js-test-container");
    if (!container) {
      throw new Error("js-test-container not found in DOM");
    }
    container.innerHTML = `
		<div class="js-checkout-header"></div>
		<div class="js-order-summary"></div>
		<div class="js-payment-summary"></div>`;
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryId: "1",
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryId: "2",
        },
      ]);
    });
    loadFromStorage();
    renderOrderSummary();
  });
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toBe(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
  });
  it("removes a product", () => {
    spyOn(localStorage, "setItem").and.callFake(() => {});
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toBe(1);
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toBeNull();
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toBeNull();
    expect(cartProducts.length).toBe(1);
    expect(cartProducts[0].productId).toBe(
      "15b6fc6f-327a-4ec4-896f-486349e85a3d"
    );
  });
});
