import { cart } from "../../data/cart.js";
describe("test suite: tests for cart methods", () => {
  describe("test suite: addToCart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
    });
    it("adds a new product to the cart", () => {
      cart.setCartItems([]);
      cart.addToCart("efafasdfewafaw-sdfasf-1213sef-43", 1);
      expect(cart.getCartItems().length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ])
      );
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(1);
    });
    it("adds an existing product to the cart", () => {
      cart.setCartItems([
        {
          productId: "efafasdfewafaw-sdfasf-1213sef-43",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);

      cart.addToCart("efafasdfewafaw-sdfasf-1213sef-43", 1);
      expect(cart.getCartItems().length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 2,
            deliveryOptionId: "1",
          },
        ])
      );
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(2);
    });
  });
  describe("test suite: deleteFromCart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      cart.setCartItems([
        {
          productId: "efafasdfewafaw-sdfasf-1213sef-43",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    it("delete the product that is in the cart", () => {
      cart.deleteFromCart("efafasdfewafaw-sdfasf-1213sef-43");
      expect(cart.getCartItems().length).toBe(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([])
      );
    });
    it("delete the product that is not in the cart", () => {
      cart.deleteFromCart("efafasdfewafaw-sdfasf-1213sef");
      expect(cart.getCartItems().length).toBe(1);
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryOptionId: "1",
          },
        ])
      );
    });
  }); ////////////////////
  describe("test suite: updateDeliveryId", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      cart.setCartItems([
        {
          productId: "efafasdfewafaw-sdfasf-1213sef-43",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    it("update delivery option of the cartProducts item", () => {
      cart.updateDeliveryId("efafasdfewafaw-sdfasf-1213sef-43", "3");
      expect(cart.getCartItems().length).toBe(1);
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(1);
      expect(cart.getCartItems()[0].deliveryOptionId).toBe("3");
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cart",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryOptionId: "3",
          },
        ])
      );
    });
    it("does nothing if updated product does not exist in the cart", () => {
      cart.updateDeliveryId("efafasdfewafaw-sdfasf-1213sef", "3");
      expect(cart.getCartItems().length).toBe(1);
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(1);
      expect(cart.getCartItems()[0].deliveryOptionId).toBe("1");
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it("does nothing if delivery option does not exist", () => {
      cart.updateDeliveryId("efafasdfewafaw-sdfasf-1213sef-43", "4");
      expect(cart.getCartItems().length).toBe(1);
      expect(cart.getCartItems()[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cart.getCartItems()[0].quantity).toBe(1);
      expect(cart.getCartItems()[0].deliveryOptionId).toBe("1");
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
  });
});
