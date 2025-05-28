export const cartProducts = [];
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
}
