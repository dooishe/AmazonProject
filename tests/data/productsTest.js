import { Product, Clothing, Appliance } from "../../data/products.js";
describe("test suite: class Product", () => {
  let product;
  beforeEach(() => {
    product = new Product({
      id: "efafasdfewafaw-sdfasf-1213sef-43",
      image: "images/products/bmw-M5.png",
      name: "BMW M5 black edition",
      rating: {
        stars: 4.5,
        count: 3,
      },
      priceCents: 6250000,
    });
  });
  it("right properties for generated object", () => {
    expect(product.id).toBe("efafasdfewafaw-sdfasf-1213sef-43");
    expect(product.image).toBe("images/products/bmw-M5.png");
    expect(product.name).toBe("BMW M5 black edition");
    expect(product.rating).toEqual({
      stars: 4.5,
      count: 3,
    });
    expect(product.priceCents).toBe(6250000);
  });
  it("method getStarsUrl return right url", () => {
    expect(product.getStarsUrl()).toBe("../images/ratings/rating-45.png");
  });
  it("method getPrice return right price", () => {
    expect(product.getPrice()).toBe("62500.00");
  });
  it("method extraInfoHtml return nothing", () => {
    expect(product.extraInfoHtml()).toBe("");
  });
});
describe("test suite: class Clothing", () => {
  let productClothing;
  beforeEach(() => {
    productClothing = new Clothing({
      id: "5968897c-4d27-4872-89f6-5bcb052746d7",
      image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
      name: "Women's Chiffon Beachwear Cover Up - Black",
      rating: {
        stars: 4.5,
        count: 235,
      },
      priceCents: 2070,
      type: "clothing",
      sizeChartLink: "images/clothing-size-chart.png",
    });
  });
  it("right properties for generated object", () => {
    expect(productClothing.id).toBe("5968897c-4d27-4872-89f6-5bcb052746d7");
    expect(productClothing.image).toBe(
      "images/products/women-chiffon-beachwear-coverup-black.jpg"
    );
    expect(productClothing.name).toBe(
      "Women's Chiffon Beachwear Cover Up - Black"
    );
    expect(productClothing.rating).toEqual({
      stars: 4.5,
      count: 235,
    });
    expect(productClothing.priceCents).toBe(2070);
    expect(productClothing.sizeChartLink).toBe(
      "images/clothing-size-chart.png"
    );
  });
  it("method getStarsUrl return right url", () => {
    expect(productClothing.getStarsUrl()).toBe(
      "../images/ratings/rating-45.png"
    );
  });
  it("method getPrice return right price", () => {
    expect(productClothing.getPrice()).toBe("20.70");
  });
  it("method extraInfoHtml return Size chart link ", () => {
    expect(productClothing.extraInfoHtml()).toBe(`
		<a href="images/clothing-size-chart.png">Size chart</a>
		`);
  });
});
describe("test suite: class Appliance", () => {
  let productClothing;
  beforeEach(() => {
    productClothing = new Appliance({
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197,
      },
      type: "appliance",
      instructionsLink: "images/appliance-instructions.png",
      warrantyLink: "images/appliance-warranty.png",
      priceCents: 1899,
    });
  });
  it("right properties for generated object", () => {
    expect(productClothing.id).toBe("54e0eccd-8f36-462b-b68a-8182611d9add");
    expect(productClothing.image).toBe(
      "images/products/black-2-slot-toaster.jpg"
    );
    expect(productClothing.name).toBe("2 Slot Toaster - Black");
    expect(productClothing.rating).toEqual({
      stars: 5,
      count: 2197,
    });
    expect(productClothing.priceCents).toBe(1899);
    expect(productClothing.instructionsLink).toBe(
      "images/appliance-instructions.png"
    );
    expect(productClothing.warrantyLink).toBe("images/appliance-warranty.png");
  });
  it("method getStarsUrl return right url", () => {
    expect(productClothing.getStarsUrl()).toBe(
      "../images/ratings/rating-50.png"
    );
  });
  it("method getPrice return right price", () => {
    expect(productClothing.getPrice()).toBe("18.99");
  });
  it("method extraInfoHtml return Instructions and Warranty links ", () => {
    expect(productClothing.extraInfoHtml()).toBe(`
		<a href="images/appliance-instructions.png">Instructions</a>
		<a href="images/appliance-warranty.png">Warranty</a>
		`);
  });
});
