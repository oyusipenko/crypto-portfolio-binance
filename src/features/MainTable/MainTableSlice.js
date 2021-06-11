import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPrice } from "./MainTableAPI";
import demoData from "../../demoData.json";

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
    return [];
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
      const newCoin = {
        coinName: coinName,
        quantity: +quantity,
        startPrice: +startPrice,
      };
      state.userCoins = [...state.userCoins, newCoin];
      localStorage.setItem("userCoins", JSON.stringify(state.userCoins));
    },
    averageCoinCost: (state, action) => {
      const { values, coins } = action.payload;
      const updArr = coins.map((coinData) => {
        if (coinData.coinName === values.coinName) {
          const coin = {};
          coin.coinName = values.coinName;
          coin.quantity = coinData.quantity + +values.quantity;
          coin.startPrice =
            (+values.quantity * +values.startPrice +
              coinData.quantity * coinData.startPrice) /
            (+values.quantity + coinData.quantity);
          return coin;
        }
        return coinData;
      });
      state.userCoins = [...updArr];
      localStorage.setItem("userCoins", JSON.stringify(state.userCoins));
    },
    sellCoins: (state, action) => {
      const { values, coins } = action.payload;
      const updArr = coins.map((coinData) => {
        if (coinData.coinName === values.coinName) {
          const coin = {};
          coin.coinName = values.coinName;
          coin.quantity = coinData.quantity - +values.quantity;
          coin.startPrice = coinData.startPrice;
          return coin;
        }
        return coinData;
      });
      state.userCoins = [...updArr];
      localStorage.setItem("userCoins", JSON.stringify(state.userCoins));
    },
    delCoin: (state, action) => {
      const { values, coins } = action.payload;
      let newCoins = [...coins];
      newCoins.splice(
        newCoins.indexOf(
          newCoins.find((coinData) => coinData.coinName === values.coinName),
          0
        ),
        1
      );

      state.userCoins = [...newCoins];
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
            startPrice: +coin.startPrice + ` $`,
            startCost: (coin.quantity * coin.startPrice).toFixed(2) + ` $`,
            currentPrice: coinsPrice[coin.coinName] + ` $`,
            currentCost:
              (coin.quantity * coinsPrice[coin.coinName]).toFixed(2) + ` $`,
            profitDollar:
              (
                coin.quantity * coinsPrice[coin.coinName] -
                coin.quantity * coin.startPrice
              ).toFixed(2) + ` $`,
            profitPercent:
              (
                ((coin.quantity * coinsPrice[coin.coinName] -
                  coin.quantity * coin.startPrice) /
                  (coin.quantity * coin.startPrice)) *
                100
              ).toFixed(0) + ` %`,
          };
          coinsData.push(coinData);
        });
        state.calculatedCoinsData = [...coinsData];
      }
    },
    caclPortfolioStatus: (state, action) => {
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
        const calculatedCoinsData = coinsData;

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
    downloadData: () => {
      const usersCoins = localStorage.getItem("userCoins");
      let dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(usersCoins));
      let downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "test.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    uploadData: (state, action) => {
      state.userCoins = [...action.payload];
    },
    loadDemoData: (state) => {
      localStorage.setItem("userCoins", demoData);
      const demoDataParsed = JSON.parse(demoData);
      state.userCoins = [...demoDataParsed];
    },
    clearAllData: (state) => {
      localStorage.setItem("userCoins", []);
      state.userCoins = [];
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

export const {
  addCoin,
  caclCoinsData,
  caclPortfolioStatus,
  averageCoinCost,
  sellCoins,
  delCoin,
  downloadData,
  uploadData,
  loadDemoData,
  clearAllData,
} = mainTableSlice.actions;

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
