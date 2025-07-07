import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { isSatSun } from "../scripts/utils/day.js";
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
    deliveryPrice: 999,
    deliveryTime: 1,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let matchingItem;
  deliveryOptions.forEach((dateObject) => {
    if (dateObject.id === deliveryOptionId) {
      matchingItem = dateObject;
    }
  });
  return matchingItem;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryTime = deliveryOption.deliveryTime;
  let deliveryDate = today;
  while (deliveryTime > 0) {
    if (isSatSun(deliveryDate)) {
      while (isSatSun(deliveryDate)) {
        deliveryDate = deliveryDate.add("1", "days");
      }
    }
    deliveryDate = deliveryDate.add("1", "days");
    deliveryTime--;
  }
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
