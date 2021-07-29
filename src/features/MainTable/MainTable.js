import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCoinsPrice,
  useCoins,
  useCoinsPrice,
  useCalculatedCoinsData,
  caclCoinsData,
} from "./MainTableSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useMediaQuery, useTheme } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    "& > *": {
      borderRadius: "5px",
    },
    "& .ag-root-wrapper-body": {
      height: "100%",
    },
    "& .ag-header-cell-label": {
      justifyContent: "center",
    },
    "& .ag-center-cols-viewport": {
      overflowX: "hidden !important",
    },
  },
}));

export default function MainTable() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const coins = useSelector(useCoins);
  const coinsPrice = useSelector(useCoinsPrice);
  const calculatedCoinsData = useSelector(useCalculatedCoinsData);

  const [gridApi, setGridApi] = useState(null);
  // const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rowData, setRowData] = useState([]);

  const columnDefsDesktop = [
    {
      headerName: "№",
      field: "number",
      width: 50,
      sortable: true,
    },
    {
      headerName: "Coin Name",
      field: "coinName",
      sortable: true,
    },
    {
      headerName: "Quantity",
      field: "quantity",
      sortable: true,
    },
    {
      headerName: "Start Cost",
      field: "startCost",
      sortable: true,
    },
    {
      headerName: "Start/Avarage Price",
      field: "startPrice",
      sortable: true,
    },
    {
      headerName: "Current Price",
      field: "currentPrice",
      sortable: true,
    },
    {
      headerName: "Current Cost",
      field: "currentCost",
      sortable: true,
    },
    {
      headerName: "Profit $",
      field: "profitDollar",
      sortable: true,
    },
    {
      headerName: "Profit %",
      field: "profitPercent",
      sortable: true,
    },
  ];
  const columnDefsMobile = [
    {
      headerName: "Coin Name",
      field: "coinName",
    },
    {
      headerName: "Current Cost",
      field: "currentCost",
    },
    {
      headerName: "Profit $",
      field: "profitDollar",
    },
    {
      headerName: "Profit %",
      field: "profitPercent",
    },
  ];
  const [columnDefs, setColumnDefs] = useState(columnDefsMobile);
  useEffect(() => {
    if (isMobile) {
      setColumnDefs(columnDefsMobile);
    } else {
      setColumnDefs(columnDefsDesktop);
    }
  }, [isMobile]);

  useEffect(() => {
    if (gridApi) {
      gridApi.refreshCells();
    }
  }, [columnDefs]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getCoinsPrice(coins));
    }, 3500);

    return () => {
      clearInterval(intervalId);
    };
  }, [coins]);

  useEffect(() => {
    setIsLoading(true);
    if (coins && coinsPrice) {
      if (coins.length === Object.keys(coinsPrice).length) {
        dispatch(caclCoinsData({ coins, coinsPrice }));
        setIsLoading(false);
      }
    }
  }, [coins, coinsPrice]);

  useEffect(() => {
    if (calculatedCoinsData) {
      setRowData(calculatedCoinsData);
    }
  }, [calculatedCoinsData]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  });

  useEffect(() => {
    if (rowData && rowData.length > 0) {
      setIsLoading(false);
    }
  }, [rowData]);

  return (
    <Card>
      <CardContent style={{ textAlign: "center" }}>
        {coins.length > 0 ? (
          isLoading ? (
            <CircularProgress style={{ margin: "20px 0" }} />
          ) : (
            <div className="ag-theme-balham" style={{ width: "100%" }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                className={classes.root}
              />
            </div>
          )
        ) : (
          <h1>Please add some coins to start using your wallet</h1>
        )}
      </CardContent>
    </Card>
  );
}
