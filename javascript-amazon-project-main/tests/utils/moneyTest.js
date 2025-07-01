import money from "../../scripts/utils/money.js";

describe("test suite: centsToDollars", () => {
  it("converts cents into dollars", () => {
    expect(money.centsToDollars(2095)).toEqual("20.95");
  });
  it("works with 0", () => {
    expect(money.centsToDollars(0)).toEqual("0.00");
  });
  it("rounds up to the nearest cent", () => {
    expect(money.centsToDollars(2200.5)).toEqual("22.01");
  });
});
