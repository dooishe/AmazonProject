import {
  addToCart,
  cartProducts,
  loadFromStorage,
  deleteFromCart,
  updateDeliveryId,
} from "../../data/cartProducts.js";
describe("test suite: tests for cartProducts functions", () => {
  describe("test suite: addToCart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
    });
    it("adds an existing product to the cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([]);
      });
      loadFromStorage();
      addToCart("efafasdfewafaw-sdfasf-1213sef-43");
      expect(cartProducts.length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartProducts",
        JSON.stringify(cartProducts)
      );
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(1);
    });
    it("adds a new product to the cart", () => {
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ]);
      });
      loadFromStorage();
      addToCart("efafasdfewafaw-sdfasf-1213sef-43", 1);
      expect(cartProducts.length).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartProducts",
        JSON.stringify(cartProducts)
      );
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(2);
    });
  });
  describe("test suite: deleteFromCart", () => {
    beforeEach(() => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ]);
      });
      loadFromStorage();
    });
    it("delete the product that is in the cart", () => {
      deleteFromCart("efafasdfewafaw-sdfasf-1213sef-43");
      expect(cartProducts.length).toBe(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartProducts",
        JSON.stringify(cartProducts)
      );
    });
    it("delete the product that is not in the cart", () => {
      deleteFromCart("efafasdfewafaw-sdfasf-1213sef");
      expect(cartProducts.length).toBe(1);
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartProducts",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ])
      );
    });
  });
  describe("test suite: updateDeliveryId", () => {
    it("update delivery option of the cartProducts item", () => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ]);
      });
      loadFromStorage();
      updateDeliveryId("efafasdfewafaw-sdfasf-1213sef-43", "3");
      expect(cartProducts.length).toBe(1);
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(1);
      expect(cartProducts[0].deliveryId).toBe("3");
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cartProducts",
        JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "3",
          },
        ])
      );
    });
    it("does nothing if updated product does not exist in the cart", () => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ]);
      });
      loadFromStorage();
      updateDeliveryId("efafasdfewafaw-sdfasf-1213sef", "3");
      expect(cartProducts.length).toBe(1);
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(1);
      expect(cartProducts[0].deliveryId).toBe("1");
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
    it("does nothing if delivery option does not exist", () => {
      spyOn(localStorage, "setItem").and.callFake(() => {});
      spyOn(localStorage, "getItem").and.callFake(() => {
        return JSON.stringify([
          {
            productId: "efafasdfewafaw-sdfasf-1213sef-43",
            quantity: 1,
            deliveryId: "1",
          },
        ]);
      });
      loadFromStorage();
      updateDeliveryId("efafasdfewafaw-sdfasf-1213sef-43", "4");
      expect(cartProducts.length).toBe(1);
      expect(cartProducts[0].productId).toBe(
        "efafasdfewafaw-sdfasf-1213sef-43"
      );
      expect(cartProducts[0].quantity).toBe(1);
      expect(cartProducts[0].deliveryId).toBe("1");
      expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
  });
});
