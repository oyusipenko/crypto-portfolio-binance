import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPrice } from "./MainTableAPI";

function loadFromLocalStorage() {
  try {
    const usersCoins = localStorage.getItem("userCoins");
    if (usersCoins === null) return undefined;
    return JSON.parse(usersCoins);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const initUsersCoins = () => {
  const data = loadFromLocalStorage();
  if (!data) {
    return [
      {
        coinName: "BTC",
        quantity: 0.007489,
        startPrice: 37351.0,
      },
      {
        coinName: "ETH",
        quantity: 0.05226765,
        startPrice: 3253.54,
      },
      {
        coinName: "BNB",
        quantity: 0.119,
        startPrice: 632,
      },
      {
        coinName: "ADA",
        quantity: 37.47,
        startPrice: 1.99,
      },
      {
        coinName: "DOGE",
        quantity: 55.4,
        startPrice: 0.7,
      },
      {
        coinName: "XRP",
        quantity: 138.04,
        startPrice: 1.05,
      },
      {
        coinName: "BCH",
        quantity: 0.0368,
        startPrice: 1366.42,
      },
      {
        coinName: "LTC",
        quantity: 0.3855,
        startPrice: 257.56,
      },
      {
        coinName: "UNI",
        quantity: 0.978,
        startPrice: 39.5,
      },
      {
        coinName: "LINK",
        quantity: 1.744,
        startPrice: 40.8,
      },
      {
        coinName: "XLM",
        quantity: 73.1,
        startPrice: 0.68,
      },
      {
        coinName: "SOL",
        quantity: 3.188,
        startPrice: 31.37,
      },
      {
        coinName: "AAVE",
        quantity: 0.0455,
        startPrice: 658,
      },
      {
        coinName: "XMR",
        quantity: 0.08,
        startPrice: 459.19,
      },
      {
        coinName: "IOTA",
        quantity: 16.84,
        startPrice: 1.9165,
      },
      {
        coinName: "AVAX",
        quantity: 0.57,
        startPrice: 36.7,
      },
      {
        coinName: "ZIL",
        quantity: 137,
        startPrice: 0.21,
      },
      {
        coinName: "HOT",
        quantity: 1363.6,
        startPrice: 0.01,
      },
      {
        coinName: "INJ",
        quantity: 1.129,
        startPrice: 17.69,
      },
      {
        coinName: "DNT",
        quantity: 145.8,
        startPrice: 0.21,
      },
      {
        coinName: "DIA",
        quantity: 5.5,
        startPrice: 3.62,
      },
      {
        coinName: "MATIC",
        quantity: 29,
        startPrice: 2.27,
      },
    ];
  } else {
    return data;
  }
};

export const getCoinsPrice = createAsyncThunk(
  "mainTable/getCoinPrice",
  async (coins) => {
    let responses = {};
    for (const coin of coins) {
      const response = await fetchPrice(coin.coinName);
      response.symbol = response.symbol.substring(
        0,
        response.symbol.indexOf("BUSD")
      );
      const price = +response.price;
      responses[response.symbol] = price.toFixed(2);
    }
    return responses;
  }
);

const initialState = {
  userCoins: initUsersCoins(),
  calculatedCoinsData: null,
  portfolioStatus: null,
  status: "idle",
};

export const mainTableSlice = createSlice({
  name: "mainTable",
  initialState,
  reducers: {
    addCoin: (state, action) => {
      const { coinName, quantity, startPrice } = action.payload;
      console.log(coinName, quantity, startPrice);
      const newCoin = {
        coinName: coinName,
        quantity: +quantity.toFixed(2),
        startPrice: +startPrice.toFixed(2),
      };
      state.userCoins.push(newCoin);
      localStorage.setItem("userCoins", JSON.stringify(state.userCoins));
    },
    caclCoinsData: (state, action) => {
      const { coins, coinsPrice } = action.payload;
      if (coins && coinsPrice) {
        let coinsData = [];
        coins.forEach((coin, index) => {
          const coinData = {
            number: index,
            coinName: coin.coinName,
            quantity: coin.quantity.toFixed(4),
            startPrice: +coin.startPrice,
            startCost: (coin.quantity * coin.startPrice).toFixed(2),
            currentPrice: coinsPrice[coin.coinName],
            currentCost: (coin.quantity * coinsPrice[coin.coinName]).toFixed(2),
            profitDollar: (
              coin.quantity * coinsPrice[coin.coinName] -
              coin.quantity * coin.startPrice
            ).toFixed(2),
            profitPercent: (
              ((coin.quantity * coinsPrice[coin.coinName] -
                coin.quantity * coin.startPrice) /
                (coin.quantity * coin.startPrice)) *
              100
            ).toFixed(0),
          };
          coinsData.push(coinData);
        });
        state.calculatedCoinsData = [...coinsData];
      }
    },
    caclPortfolioStatus: (state, action) => {
      const calculatedCoinsData = action.payload;
      if (calculatedCoinsData) {
        let portfolioStatus = {
          startCost: 0,
          currentCost: 0,
          profitDollar: 0,
          profitPercent: 0,
        };
        calculatedCoinsData.forEach(
          ({ startCost, currentCost, profitDollar }) => {
            portfolioStatus.startCost = +portfolioStatus.startCost + +startCost;
            portfolioStatus.currentCost =
              +portfolioStatus.currentCost + +currentCost;
            portfolioStatus.profitDollar =
              +portfolioStatus.profitDollar + +profitDollar;
          }
        );
        portfolioStatus = {
          ...portfolioStatus,
          profitPercent:
            portfolioStatus.profitDollar / portfolioStatus.startCost,
        };
        state.portfolioStatus = { ...portfolioStatus };
      }
    },
  },
  extraReducers: {
    [getCoinsPrice.pending]: (state) => {
      state.status = "loading";
    },
    [getCoinsPrice.fulfilled]: (state, action) => {
      state.status = "idle";
      state.coinsPrice = action.payload;
    },
  },
});

export const { addCoin, caclCoinsData, caclPortfolioStatus } =
  mainTableSlice.actions;

export const useCoins = (state) => {
  return state.mainTable.userCoins;
};

export const useCoinsPrice = (state) => {
  return state.mainTable.coinsPrice;
};

export const useCalculatedCoinsData = (state) => {
  return state.mainTable.calculatedCoinsData;
};

export const usePortfolioStatus = (state) => {
  return state.mainTable.portfolioStatus;
};

export default mainTableSlice.reducer;
