import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/products.js";
describe("test suite: integration test for orderSummary page", () => {
  describe("test suite: renderOrderSummary", () => {
    const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";
    const productName1 = "Black and Gray Athletic Cotton Socks - 6 Pairs";
    const productName2 = "2 Slot Toaster - Black";
    beforeAll((done) => {
      loadProductsFetch().then(() => {
        done();
      });
    });
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
      ).toBe("$10.90");
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toBe("$18.99");
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
      expect(cart.cartItems.length).toBe(1);
      expect(cart.cartItems[0].productId).toBe(
        "54e0eccd-8f36-462b-b68a-8182611d9add"
      );
      expect(
        document.querySelector(`.js-product-name-${productId2}`).innerText
      ).toBe(productName2);
      expect(
        document.querySelector(`.js-product-price-${productId2}`).innerText
      ).toBe("$18.99");
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
      expect(cart.cartItems[0].productId).toBe(productId1);
      expect(cart.cartItems[0].deliveryId).toBe("3");
      expect(
        document.querySelector(".js-payment-shipping-and-handling").innerText
      ).toBe("$4.99");
      expect(document.querySelector(".js-payment-total-price").innerText).toBe(
        "$50.36"
      );
    });
  });
});
