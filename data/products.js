import { centsToDollars } from "../scripts/utils/money.js";
export function getProduct(productId) {
  let matchingProduct;
  products.forEach((cartProduct) => {
    if (cartProduct.getId() === productId) {
      matchingProduct = cartProduct;
    }
  });
  return matchingProduct;
}

export class Product {
  #id;
  #image;
  #name;
  #rating;
  #priceCents;
  #keyWords;
  constructor(productDetails) {
    this.#id = productDetails.id;
    this.#image = productDetails.image;
    this.#name = productDetails.name;
    this.#rating = productDetails.rating;
    this.#priceCents = productDetails.priceCents;
    this.#keyWords = productDetails.keywords;
  }
  getId() {
    return this.#id;
  }
  getImage() {
    return this.#image;
  }
  getName() {
    return this.#name;
  }
  getRating() {
    return this.#rating;
  }
  getPriceCents() {
    return this.#priceCents;
  }
  getStarsUrl() {
    return `../images/ratings/rating-${this.#rating.stars * 10}.png`;
  }
  getPrice() {
    return centsToDollars(this.#priceCents);
  }
  extraInfoHtml() {
    return "";
  }
  getKeyWords() {
    return this.#keyWords;
  }
}

export class Clothing extends Product {
  #sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.#sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfoHtml() {
    return `
		<a href="${this.#sizeChartLink}">Size chart</a>
		`;
  }
  getSizeChartLink() {
    return this.#sizeChartLink;
  }
}

export class Appliance extends Product {
  #instructionsLink;
  #warrantyLink;
  constructor(productDetails) {
    super(productDetails);
    this.#instructionsLink = productDetails.instructionsLink;
    this.#warrantyLink = productDetails.warrantyLink;
  }
  extraInfoHtml() {
    return `
		<a href="${this.#instructionsLink}">Instructions</a>
		<a href="${this.#warrantyLink}">Warranty</a>
		`;
  }
  getInstructionsLink() {
    return this.#instructionsLink;
  }
  getWarrantyLink() {
    return this.#warrantyLink;
  }
}

export let products = [];

export async function loadProductsFetch() {
  const response = await fetch("https://supersimplebackend.dev/products");
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const productsData = await response.json();
  products = productsData.map((productDetails) => {
    if (productDetails.type === "clothing") return new Clothing(productDetails);
    else if (productDetails.keywords.includes("appliances")) {
      productDetails.instructionsLink = "../images/appliance-instructions.png";
      productDetails.warrantyLink = "../images/appliance-warranty.png";
      const appliance = new Appliance(productDetails);
      return appliance;
    }

    return new Product(productDetails);
  });

  console.log("load products");
}
