import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { isSatSun } from "../scripts/utils/day.js";
class DeliveryOptions {
  #deliveryOptionsList;
  constructor(deliveryOptionsList) {
    this.#deliveryOptionsList = deliveryOptionsList;
  }
  getDeliveryOptionsList() {
    return this.#deliveryOptionsList;
  }
  isValidOptionId(optionId) {
    let flag = false;
    this.#deliveryOptionsList.forEach((devOpt) => {
      if (devOpt.id === optionId) {
        flag = true;
      }
    });
    return flag;
  }
  getDeliveryOption(deliveryOptionId) {
    let matchingItem;
    this.#deliveryOptionsList.forEach((dateObject) => {
      if (dateObject.id === deliveryOptionId) {
        matchingItem = dateObject;
      }
    });
    return matchingItem;
  }
  calculateDeliveryDate(deliveryOption) {
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
}
export const deliveryOptions = new DeliveryOptions([
  {
    id: "1",
    deliveryTime: 7,
    deliveryPrice: 0,
  },

  {
    id: "2",
    deliveryTime: 3,
    deliveryPrice: 499,
  },
  {
    id: "3",
    deliveryPrice: 999,
    deliveryTime: 1,
  },
]);
