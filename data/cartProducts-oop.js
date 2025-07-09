import { isValidOptionId } from "./deliveryOptions.js";
function CartProducts(localStorageKey) {
  const cartProducts = {
    cartItems: undefined,
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    },
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
    deleteFromCart(productId) {
      const newCart = this.cartItems.filter(
        (item) => item.productId !== productId
      );
      this.cartItems = newCart;
      this.saveToLocalStorage();
    },
    calculateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },
    addToCart(productId, quantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity: 1,
          deliveryId: "1",
        });
      }
      this.saveToLocalStorage();
    },
    updateQuantity(productId, newQuantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      matchingItem.quantity = newQuantity;
      this.saveToLocalStorage();
    },
    updateDeliveryId(productId, newDateId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          matchingItem = cartItem;
        }
      });
      if (!matchingItem) return;
      if (!isValidOptionId(newDateId)) return;
      matchingItem.deliveryId = newDateId;
      this.saveToLocalStorage();
    },
  };
  return cartProducts;
}

const cart = CartProducts("cart-oop");
const buisnessCart = CartProducts("cart-buisness");
cart.loadFromStorage();
buisnessCart.loadFromStorage();
console.log(cart);
console.log(buisnessCart);
