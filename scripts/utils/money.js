const utils = {
  centsToDollars(cents) {
    return (Math.round(cents) / 100).toFixed(2);
  },
};

export default utils;
