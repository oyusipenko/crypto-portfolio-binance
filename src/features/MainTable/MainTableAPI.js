export function fetchPrice(coinName) {
  const response = fetch(
    `https://www.binance.com/api/v3/ticker/price?symbol=${coinName}BUSD`
  ).then((response) => response.json());
  return response;
}
