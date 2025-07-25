import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { isSatSun, countDaysBetween } from "../scripts/utils/day.js";
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
  getDeliveryOptionFromTwoDates(startDate, endDate) {
    const daysBetween = countDaysBetween(startDate, endDate);
    const deliveryOption = this.#deliveryOptionsList.find((option) => {
      return option.deliveryTime === daysBetween;
    });
    if (!deliveryOption) {
      throw new Error("can't find deliveryOption");
    }
    return deliveryOption;
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
  calculateDeliveryDate(
    deliveryOption,
    orderTime = undefined,
    formatString = "dddd, MMMM D"
  ) {
    if (!deliveryOption || typeof deliveryOption.deliveryTime !== "number") {
      throw new Error(
        "Invalid deliveryOption: missing or incorrect deliveryTime."
      );
    }
    let deliveryTime = deliveryOption.deliveryTime;
    let deliveryDate = dayjs(orderTime);
    while (deliveryTime > 0) {
      while (isSatSun(deliveryDate)) {
        deliveryDate = deliveryDate.add("1", "days");
      }

      deliveryDate = deliveryDate.add("1", "days");

      while (isSatSun(deliveryDate)) {
        deliveryDate = deliveryDate.add("1", "days");
      }

      deliveryTime--;
    }
    const dateString = deliveryDate.format(formatString);
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
