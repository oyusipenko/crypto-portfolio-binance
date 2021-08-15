import HmacSHA256 from "crypto-js/hmac-sha256";

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

export async function checkCoin(coinName) {
  const response = await getCoinPrice(coinName);
  console.log(response);
  console.log(!!response);
  return !!response;
}

export function testHistoryOrders() {
  const ts = new Date().getTime();
  const apiKey =
    "HURrvrfCi7lw6HMmMCmmiahVteMJOih5oKvoltBYuMpFdnzLQvMSA0wyNAPzBhJL";
  console.log(ts);
  console.log(HmacSHA256);
  const hashDigest = HmacSHA256(
    apiKey,
    "Xrnzga2Km9uuCAUEs3QTZK2IWbnL2KdJncRQqhwDnVzLe8suu1kTDnoJVjK2cfmJ"
  );
  console.log(hashDigest);
  const response = fetch(
    `https://www.binance.com/api/v3/allOrders?symbol=BTCBUSD&timestamp=${ts}`,
    { headers: { "X-MBX-APIKEY": `${hashDigest}` } }
  )
    .then((response) => response.json())
    .catch(function (e) {
      console.log("error", e);
    });

  return response;
}
