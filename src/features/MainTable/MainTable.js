import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoinsPrice,
  useCoins,
  useCoinsPrice,
  useCalculatedCoinsData,
  caclCoinsData,
} from "./MainTableSlice";
import "./MainTable.scss";
import { AgGridReact } from "ag-grid-react";
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
  const calculatedCoinsData = useSelector(useCalculatedCoinsData);

  useEffect(() => {
    setInterval(() => {
      dispatch(getCoinsPrice(coins));
    }, 1000);
  }, []);

  useEffect(() => {
    if (coins && coinsPrice) {
      dispatch(caclCoinsData({ coins, coinsPrice }));
    }
  }, [coins, coinsPrice]);

  useEffect(() => {
    if (calculatedCoinsData) {
      console.log("rowData", calculatedCoinsData);
      setRowData(calculatedCoinsData);
    }
  }, [calculatedCoinsData]);

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
      style={{ height: "1000px", width: "100%", marginTop: "15px" }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        gridOptions={gridOptions}
      />
    </div>
  );
}
