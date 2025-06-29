import {
  addToCart,
  cartProducts,
  loadFromStorage,
} from "../../data/cartProducts.js";

describe("test suite: addToCart", () => {
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem").and.callFake(() => {});
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart("efafasdfewafaw-sdfasf-1213sef-43");
    expect(cartProducts.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cartProducts[0].productId).toBe("efafasdfewafaw-sdfasf-1213sef-43");
    expect(cartProducts[0].quantity).toBe(1);
  });
  it("adds a new product to the cart", () => {
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
    addToCart("efafasdfewafaw-sdfasf-1213sef-43", 1);
    expect(cartProducts.length).toBe(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cartProducts[0].productId).toBe("efafasdfewafaw-sdfasf-1213sef-43");
    expect(cartProducts[0].quantity).toBe(2);
  });
});
