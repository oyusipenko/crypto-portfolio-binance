import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCoins,
  averageCoinCost,
  sellCoins,
  delCoin,
} from "../../features/MainTable/MainTableSlice";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
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
    minHeight: "246px",
  },
  dropdown: {
    // marginTop: "16px",
  },
  errorBox: {
    color: "red",
    textAlign: "left",
    fontSize: "12px",
  },
}));

export default function AvarageCoinCost() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const coins = useSelector(useCoins);

  const [selectedAction, setSelectedAction] = useState();
  const [coinName, setCoinName] = useState();

  const handleChangeAction = (event) => {
    setSelectedAction(event.target.value);
  };

  const handleChangeCoin = (event) => {
    setCoinName(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Buy/Sell/Delete coins
        </Typography>
        <Formik
          initialValues={{
            selectedAction: "",
            coinName: "",
            quantity: "",
            startPrice: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.selectedAction) {
              errors.selectedAction = "Required";
            }
            if (!values.coinName) {
              errors.coinName = "Required";
            }
            if (
              (selectedAction === "buyCoins" && !values.quantity) ||
              (selectedAction === "sellCoins" && !values.quantity)
            ) {
              console.log("123");
              errors.quantity = "Required";
            } else if (
              (selectedAction === "buyCoins" &&
                !/(^[0-9.]+$)/g.test(values.quantity)) ||
              (selectedAction === "sellCoins" &&
                !/(^[0-9.]+$)/g.test(values.quantity))
            ) {
              errors.quantity = "Allows only digits";
            }
            if (selectedAction === "buyCoins" && !values.startPrice) {
              errors.startPrice = "Required";
            } else if (
              selectedAction === "buyCoins" &&
              !/(^[0-9.]+$)/g.test(values.startPrice)
            ) {
              errors.startPrice = "Allows only digits";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
            switch (values.selectedAction) {
              case "buyCoins":
                dispatch(averageCoinCost({ values, coins }));
                break;
              case "sellCoins":
                dispatch(sellCoins({ values, coins }));
                break;
              case "deleteCoins":
                dispatch(delCoin({ values, coins }));
                break;
              default:
                console.log(`Sorry, we are out of ${values.selectedAction}.`);
            }
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
              noValidate
              autoComplete="off"
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "192px",
                }}
              >
                <FormControl>
                  <InputLabel>Select action:</InputLabel>

                  <Select
                    onChange={(e) => {
                      handleChange(e);
                      handleChangeAction(e);
                    }}
                    className={classes.dropdown}
                    value={selectedAction}
                    name="selectedAction"
                  >
                    <MenuItem value="buyCoins">
                      <em>Buy more coins</em>
                    </MenuItem>
                    <MenuItem value="sellCoins">
                      <em>Sell coins</em>
                    </MenuItem>
                    <MenuItem value="deleteCoins">
                      <em>Delete</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                {errors.selectedAction && touched.selectedAction && (
                  <div className={classes.errorBox}>
                    {errors.selectedAction}
                  </div>
                )}
                <FormControl>
                  <InputLabel>Choose your coin:</InputLabel>
                  <Select
                    onChange={handleChange}
                    className={classes.dropdown}
                    value={coinName}
                    name="coinName"
                  >
                    {coins.map((coin) => {
                      return (
                        <MenuItem value={coin.coinName}>
                          <em>{coin.coinName}</em>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {errors.coinName && touched.coinName && (
                  <div className={classes.errorBox}>{errors.coinName}</div>
                )}

                {selectedAction === "buyCoins" ||
                selectedAction === "sellCoins" ? (
                  <>
                    <TextField
                      type="text"
                      name="quantity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Quantity"
                      value={values.quantity}
                    />
                    {errors.quantity && touched.quantity && (
                      <div className={classes.errorBox}>{errors.quantity}</div>
                    )}
                  </>
                ) : null}
                {selectedAction === "buyCoins" ? (
                  <>
                    <TextField
                      type="text"
                      name="startPrice"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Purchase price"
                      value={values.startPrice}
                    />
                    {errors.startPrice && touched.startPrice && (
                      <div className={classes.errorBox}>
                        {errors.startPrice}
                      </div>
                    )}
                  </>
                ) : null}
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
