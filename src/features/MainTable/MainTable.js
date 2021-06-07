import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCoinsPrice, useCoins, useCoinsPrice } from "./MainTableSlice";
import "./MainTable.scss";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export default function MainTable() {
  const dispatch = useDispatch();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Number",
      field: "number",
    },
    {
      headerName: "coinName",
      field: "coinName",
    },
    {
      headerName: "quantity",
      field: "quantity",
    },
    {
      headerName: "startCost",
      field: "startCost",
    },
    {
      headerName: "startPrice",
      field: "startPrice",
    },
    {
      headerName: "currentPrice",
      field: "currentPrice",
    },
    {
      headerName: "currentCost",
      field: "currentCost",
    },
    {
      headerName: "profitDollar",
      field: "profitDollar",
    },
    {
      headerName: "profitPercent",
      field: "profitPercent",
    },
  ]);

  const coins = useSelector(useCoins);
  const coinsPrice = useSelector(useCoinsPrice);

  useEffect(() => {
    setInterval(() => {
      dispatch(getCoinsPrice(coins));
    }, 5000);
  }, []);

  useEffect(() => {
    if (coins && coinsPrice) {
      console.log("useEffect1", coins);
      console.log("useEffect2", coinsPrice);
      const tableOptions = [];
      coins.forEach((coin, index) => {
        const newTableOption = {
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
          profitPercent:
            (
              ((coin.quantity * coinsPrice[coin.coinName] -
                coin.quantity * coin.startPrice) /
                (coin.quantity * coin.startPrice)) *
              100
            ).toFixed(0) + "%",
        };
        tableOptions.push(newTableOption);
        setRowData(tableOptions);
      });
      console.log(tableOptions);
    }
  }, [coins, coinsPrice]);
  const [totalAmountStart, setTotalAmountStart] = useState(0);
  useEffect(() => {
    if (rowData) {
      let totalStart = 0;
      rowData.forEach((coin) => {
        totalStart += +coin.startCost;
      });
      console.log("totalStart", totalStart);
      setTotalAmountStart(totalStart);
    }
  }, [rowData]);
  const [totalAmountCurrent, setTotalAmountCurrent] = useState(0);
  useEffect(() => {
    if (rowData) {
      let totalCurrent = 0;
      rowData.forEach((coin) => {
        totalCurrent += +coin.currentCost;
      });
      console.log("totalCurrent", totalCurrent);
      setTotalAmountCurrent(totalCurrent);
    }
  }, [rowData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  });

  const gridOptions = {};

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: "1000px", width: "100%" }}
    >
      <div>
        <p>Total Amount Start: {totalAmountStart.toFixed(2)}</p>
        <p>Total Amount Current: {totalAmountCurrent.toFixed(2)}</p>
        <p>
          Total profit $: {(totalAmountCurrent - totalAmountStart).toFixed(2)}
        </p>
        <p>
          Total profit %:{" "}
          {(
            ((totalAmountCurrent - totalAmountStart) / totalAmountStart) *
            100
          ).toFixed(2)}
        </p>
      </div>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        gridOptions={gridOptions}
      />
    </div>
  );
}
