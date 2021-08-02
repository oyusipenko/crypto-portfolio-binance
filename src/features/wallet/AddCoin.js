import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin, useCoins } from "./walletSlice";
import { checkCoin } from "./walletAPI";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
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
  },
  submitButton: {
    marginTop: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "247px",
  },
  textField: {
    width: "100%",
  },
  errorBox: {
    color: "red",
    textAlign: "left",
    fontSize: "12px",
  },
}));

export default function AddCoin() {
  const dispatch = useDispatch();
  const coins = useSelector(useCoins);

  // const checkCoin = async (coinName) => {
  //   const response = await checkCoin(coinName);
  //   return !response;
  // };

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Add New Coin
        </Typography>
        <Formik
          initialValues={{ coinName: "", quantity: "", startPrice: "" }}
          validate={async (values) => {
            const errors = {};
            if (!values.coinName) {
              errors.coinName = "Required";
            } else if (!/(^[A-Z]+$)/.test(values.coinName)) {
              errors.coinName = "Allows only capital letters";
            } else if (
              coins.find((coin) => coin.coinName === values.coinName)
            ) {
              errors.coinName = "This coin already exist";
            } else if (await checkCoin(values.coinName)) {
              errors.coinName = `${values.coinName}/BUSD doesn't exists on the Binance`;
            }
            if (!values.quantity) {
              errors.quantity = "Required";
            } else if (!/(^[0-9.]+$)/g.test(values.quantity)) {
              errors.quantity = "Allows only digits";
            }
            if (!values.startPrice) {
              errors.startPrice = "Required";
            } else if (!/(^[0-9.]+$)/g.test(values.startPrice)) {
              errors.startPrice = "Allows only digits";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addCoin(values));
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form}
              autoComplete="off"
            >
              <Box>
                <TextField
                  type="text"
                  name="coinName"
                  onChange={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  label="Coin name"
                  value={values.coinName}
                  className={classes.textField}
                />
                {errors.coinName && touched.coinName && (
                  <div className={classes.errorBox}>{errors.coinName}</div>
                )}

                <TextField
                  type="text"
                  name="quantity"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Quantity"
                  value={values.quantity}
                  className={classes.textField}
                />
                {errors.quantity && touched.quantity && (
                  <div className={classes.errorBox}>{errors.quantity}</div>
                )}

                <TextField
                  type="text"
                  name="startPrice"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Purchase price"
                  value={values.startPrice}
                  className={classes.textField}
                />
                {errors.startPrice && touched.startPrice && (
                  <div className={classes.errorBox}>{errors.startPrice}</div>
                )}
              </Box>
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                className={classes.submitButton}
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
