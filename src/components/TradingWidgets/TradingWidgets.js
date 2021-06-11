import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TradingViewWidget from "react-tradingview-widget";
import { useSelector } from "react-redux";
import { useCoins } from "../../features/MainTable/MainTableSlice";

export default function TradingWidgets() {
  const coins = useSelector(useCoins);

  const widgets = coins.map((coin) => {
    return (
      <Card style={{ marginBottom: "20px" }}>
        <CardContent>
          <TradingViewWidget
            symbol={`BINANCE:${coin.coinName}BUSD`}
            width={"100%"}
          />
        </CardContent>
      </Card>
    );
  });
  return widgets;
}
