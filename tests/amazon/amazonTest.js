import { products, setProducts } from "../../data/products.js";
import { renderAmazon } from "../../scripts/amazon/amazon.js";
import { renderAmazonHeader } from "../../scripts/amazon/amazonHeader.js";
import { cart } from "../../data/cart.js";
describe("test suite: integration test for amazon page", () => {
  let container;
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  const productCount1 = 87;
  beforeEach(() => {
    spyOn(localStorage, "setItem").and.callFake(() => {});
    setProducts([
      {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87,
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"],
      },
      {
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127,
        },
        priceCents: 2095,
        keywords: ["sports", "basketballs"],
      },
    ]);
    container = document.querySelector(".js-test-container");
    container.innerHTML = `
      <div class='amazon-header'></div>
      <div class='js-products-grid'></div>
      `;
    renderAmazon();
  });
  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
    localStorage.clear();
    cart.setCartItems([]);
  });
  it("correctly displays products on the page", () => {
    expect(
      document
        .querySelector(`.js-product-image-${productId1}`)
        .getAttribute("src"),
    ).toBe("images/products/athletic-cotton-socks-6-pairs.jpg");
    expect(
      document
        .querySelector(`.js-product-name-${productId1}`)
        .textContent.trim(),
    ).toBe("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document
        .querySelector(`.js-product-rating-stars-${productId1}`)
        .getAttribute("src"),
    ).toContain("ratings/rating-45.png");
    expect(
      document
        .querySelector(`.js-product-rating-count-${productId1}`)
        .textContent.trim(),
    ).toBe(`${productCount1}`);
    expect(
      document
        .querySelector(`.js-product-price-${productId1}`)
        .textContent.trim(),
    ).toBe(`$10.90`);
    //можно еще проверить extraInfoHtml(что для Product там ничего, для Appliance там instructionsLink и warrantyLink, для Clothing там sizeChartLink)
  });
  it("addToCart button adds item to the cart and updates cartQuantity, and displays cartQuantity in amazonHeader", () => {
    renderAmazonHeader();
    localStorage.clear();
    cart.setCartItems([]);
    const addButtonProductId1 = document.querySelector(
      `[data-testid="add-to-cart"][data-product-id="${productId1}"]`,
    );
    const addButtonProductId2 = document.querySelector(
      `[data-testid="add-to-cart"][data-product-id="${productId2}"]`,
    );
    addButtonProductId1.click();
    expect(cart.getCartItems().length).toBe(1);
    expect(cart.getCartItems()[0].quantity).toBe(1);
    addButtonProductId1.click();
    expect(cart.getCartItems().length).toBe(1);
    expect(cart.getCartItems()[0].quantity).toBe(2);
    addButtonProductId2.click();
    expect(cart.getCartItems().length).toBe(2);
    expect(cart.getCartItems()[0].quantity).toBe(2);
    expect(cart.getCartItems()[1].quantity).toBe(1);
    expect(document.querySelector(".js-cart-quantity").textContent).toBe("3");
  });
});
