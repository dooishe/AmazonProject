export let cartProducts;
loadFromStorage();
export function loadFromStorage() {
  cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
}
export function saveToLocalStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}
export function deleteFromCart(productId) {
  const newCart = cartProducts.filter((item) => item.productId !== productId);
  cartProducts = newCart;
  saveToLocalStorage();
}
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cartProducts.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}
export function addToCart(productId, quantity) {
  let matchingItem;
  cartProducts.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cartProducts.push({
      productId,
      quantity: 1,
      deliveryId: "1",
    });
  }
  saveToLocalStorage();
}
export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cartProducts.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;
  saveToLocalStorage();
}
export function updateDeliveryId(productId, newDateId) {
  let matchingItem;
  cartProducts.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryId = newDateId;
  saveToLocalStorage();
}
