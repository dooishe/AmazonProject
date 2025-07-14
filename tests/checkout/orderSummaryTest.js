import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../data/class-cart.js";
describe("test suite: integration test for orderSummary page", () => {
  describe("test suite: renderOrderSummary", () => {
    const productId1 = "efafasdfewafaw-sdfasf-1213sef-43";
    const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
    const productName1 = "BMW M5 black edition";
    const productName2 = "Intermediate Size Basketball";
    beforeEach(() => {
      const container = document.querySelector(".js-test-container");
      if (!container) {
        throw new Error("js-test-container not found in DOM");
      }
      container.innerHTML = `
		<div class="js-checkout-header"></div>
		<div class="js-order-summary"></div>
		<div class="js-payment-summary"></div>`;
      cart.cartItems = [
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
      ];
      renderOrderSummary();
    });
    afterEach(() => {
      document.querySelector(".js-test-container").innerHTML = "";
    });
    it("displays the cart", () => {
      expect(document.querySelectorAll(".js-cart-item-container").length).toBe(
        2
      );
      expect(
        document.querySelector(`.js-product-quantity-${productId1}`).innerText
      ).toContain("Quantity: 2");
      expect(
        document.querySelector(`.js-product-quantity-${productId2}`).innerText
      ).toContain("Quantity: 1");
      expect(
        document.querySelector(`.js-product-name-${productId1}`).innerText
      ).toBe(productName1);
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toBe(productName2);
      expect(
        document.querySelector(`.js-product-price-${productId1}`).innerText
      ).toBe("$62500.00");
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toBe("$20.95");
    });
    it("removes a product", () => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      document.querySelector(`.js-delete-link-${productId1}`).click();
      expect(document.querySelectorAll(".js-cart-item-container").length).toBe(
        1
      );
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
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toBe(productName2);
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toBe("$20.95");
    });
    it("updating the delivery option", () => {
      document.querySelector(`.js-delivery-option-${productId1}-${3}`).click();
      expect(
        document.querySelector(`.js-delivery-option-input-${productId1}-${3}`)
          .checked
      ).toBeTrue();
      expect(document.querySelectorAll(".js-cart-item-container").length).toBe(
        2
      );
      expect(cartProducts[0].productId).toBe(productId1);
      expect(cartProducts[0].deliveryId).toBe("3");
      expect(
        document.querySelector(".js-payment-shipping-and-handling").innerText
      ).toBe("$4.99");
      expect(document.querySelector(".js-payment-total-price").innerText).toBe(
        "$137528.53"
      );
    });
  });
});
