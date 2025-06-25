export const deliveryOptions = [
  {
    id: "3",
    deliveryTime: 7,
    deliveryPrice: 0,
  },

  {
    id: "2",
    deliveryTime: 3,
    deliveryPrice: 499,
  },
  {
    id: "1",
    deliveryTime: 1,
    deliveryPrice: 999,
  },
];

export function findMatchingDeliveryObject(DateId) {
  let matchingItem;
  deliveryOptions.forEach((dateObject) => {
    if (dateObject.id === DateId) {
      matchingItem = dateObject;
    }
  });
  return matchingItem;
}
