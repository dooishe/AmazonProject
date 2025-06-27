import money from "../scripts/utils/money.js";

console.log("test suite: centsToDollars function");

console.log("converts cents into dollars");
if (money.centsToDollars(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}
console.log("works with 0");
if (money.centsToDollars(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}
console.log("rounds up to the nearest cent");
if (money.centsToDollars(2200.5) === "22.01") {
  console.log("passed");
} else {
  console.log("failed");
}
