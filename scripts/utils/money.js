export function centsToDollars(cents) {
  return (Math.round(cents) / 100).toFixed(2);
}
