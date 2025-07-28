export function renderAmazonHeader() {
  document.querySelector(
    ".amazon-header"
  ).innerHTML = `<div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo" src="images/amazon-logo-white.png" />
          <img
            class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png"
          />
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input
          class="js-search-bar search-bar"
          type="text"
          placeholder="Search"
        />

        <button class="search-button js-search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="js-cart-quantity cart-quantity"></div>
          <div class="cart-text">Cart</div>
        </a>
      </div>`;
  makeEventListheners();
}
function makeEventListheners() {
  document.querySelector(".js-search-button")?.addEventListener("click", () => {
    const inputElement = document.querySelector(".js-search-bar");
    if (!inputElement) {
      console.error("Input element not found");
      return;
    }
    const inputValue = inputElement.value.trim();
    if (inputValue) {
      window.location.href = `/amazon.html?search_query=${encodeURIComponent(
        inputValue
      )}`;
    }
  });
}
