export function toUrlString(queryObject) {
  return new URLSearchParams(queryObject).toString();
}
