function getCoinPrice(coinName) {
  const response = fetch(
    `https://www.binance.com/api/v3/ticker/price?symbol=${coinName}BUSD`
  )
    .then((response) => response.json())
    .catch(function (e) {
      console.log("error", e);
    });

  return response;
}

export function fetchCoinsPrice(coins) {
  const response = Promise.all(
    coins.map((coin) => getCoinPrice(coin.coinName))
  );

  return response;
}

export function checkCoin(coinName) {
  const response = getCoinPrice(coinName);

  return !!response;
}
