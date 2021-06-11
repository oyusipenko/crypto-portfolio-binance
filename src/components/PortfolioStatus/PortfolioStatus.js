import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  usePortfolioStatus,
  caclPortfolioStatus,
  useCalculatedCoinsData,
  useCoins,
  useCoinsPrice,
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
    minHeight: "327px",
  },
  cardContent: {
    textAlign: "center",
    height: "100%",
  },
  portfolioRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  spinnerBox: {
    height: "202px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function AvarageCoinCost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const coins = useSelector(useCoins);
  const coinsPrice = useSelector(useCoinsPrice);
  const calculatedCoinsData = useSelector(useCalculatedCoinsData);
  const portfolioStatus = useSelector(usePortfolioStatus);
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    dispatch(caclPortfolioStatus({ coins, coinsPrice }));
  }, [calculatedCoinsData]);

  useEffect(() => {
    if (portfolioStatus) {
      setPortfolioData(portfolioStatus);
    }
  }, [portfolioStatus]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (portfolioStatus && portfolioStatus.startCost > 0) {
      setIsLoading(false);
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
        <Box
          className={
            !portfolioData || !coins.length > 0 ? classes.spinnerBox : null
          }
        >
          {coins.length > 0 ? (
            isLoading > 0 ? (
              <CircularProgress />
            ) : (
              <Typography component="div">
                <Box className={classes.portfolioRow}>
                  <Typography variant="body1" color="textSecondary">
                    Total Amount Start:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    {portfolioData.startCost.toFixed(2)}$
                  </Typography>
                </Box>
                <Box className={classes.portfolioRow}>
                  <Typography variant="body1" color="textSecondary">
                    Total Amount Current:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    {portfolioData.currentCost.toFixed(2)}$
                  </Typography>
                </Box>
                <Box className={classes.portfolioRow}>
                  <Typography variant="body1" color="textSecondary">
                    Total profit $:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight="fontWeightBold"
                  >
                    {portfolioData.profitDollar.toFixed(2)}$
                  </Typography>
                </Box>
                <Box className={classes.portfolioRow}>
                  <Typography variant="body1" color="textSecondary">
                    Total profit %:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    fontWeight={800}
                    m={1}
                  >
                    {(portfolioData.profitPercent * 100).toFixed(2)}%
                  </Typography>
                </Box>
              </Typography>
            )
          ) : (
            <h3>Please add some coins to start using your wallet</h3>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
