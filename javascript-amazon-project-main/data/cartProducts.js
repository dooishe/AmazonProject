export let cartProducts =
  JSON.parse(localStorage.getItem("cartProducts")) || [];
export function saveToLocalStorage() {
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}
export function deleteFromCart(productId) {
  const newCart = cartProducts.filter((item) => item.productId !== productId);
  cartProducts = newCart;
  saveToLocalStorage();
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
      quantity,
    });
  }
  saveToLocalStorage();
}
