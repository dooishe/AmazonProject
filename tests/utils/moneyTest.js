import money from "../../scripts/utils/money.js";
describe("test suite: utils", () => {
  describe("test suite: centsToDollars", () => {
    it("converts cents into dollars", () => {
      expect(money.centsToDollars(2095)).toBe("20.95");
    });
    it("works with 0", () => {
      expect(money.centsToDollars(0)).toBe("0.00");
    });
    it("rounds up to the nearest cent", () => {
      expect(money.centsToDollars(2200.5)).toBe("22.01");
    });
    it("rounds down to the nearest cent", () => {
      expect(money.centsToDollars(2200.4)).toBe("22.00");
    });
    it("negative number", () => {
      expect(money.centsToDollars(-2000)).toBe("-20.00");
    });
  });
});
