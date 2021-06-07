import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePortfolioStatus,
  caclPortfolioStatus,
  useCalculatedCoinsData,
} from "../../features/MainTable/MainTableSlice";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      flexDirection: "column",
    },
  },
  card: {
    height: "280px",
  },
  cardContent: {
    textAlign: "center",
    height: "100%",
  },
  submitButton: {
    marginTop: "20px",
  },
  form: { display: "flex", flexDirection: "column" },
  dropdown: {
    marginTop: "16px",
  },
  portfolio: {
    display: "flex",
    justifyContent: "center",
    // height: "100%",
  },
}));

export default function AvarageCoinCost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const calculatedCoinsData = useSelector(useCalculatedCoinsData);
  const portfolioStatus = useSelector(usePortfolioStatus);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    dispatch(caclPortfolioStatus(calculatedCoinsData));
  }, [calculatedCoinsData]);

  useEffect(() => {
    if (portfolioStatus) {
      console.log(portfolioStatus);
      setPortfolioData(portfolioStatus);
    }
  }, [portfolioStatus]);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Box>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Portfolio Status
          </Typography>
        </Box>
        <Box className={classes.portfolio}>
          {!portfolioData ? (
            <CircularProgress />
          ) : (
            <div>
              <p>Total Amount Start: {portfolioData.startCost}$</p>
              <p>
                Total Amount Current: {portfolioData.currentCost.toFixed(2)}$
              </p>
              <p>Total profit $: {portfolioData.profitDollar.toFixed(2)}$</p>
              <p>
                Total profit %: {portfolioData.profitPercent.toFixed(2) * 100}%
              </p>
            </div>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
