import React from "react";
import { useDispatch } from "react-redux";
import { addCoin } from "../../features/MainTable/MainTableSlice";
import { Formik } from "formik";
import "./AddCoin.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

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
  },
  submitButton: {
    marginTop: "20px",
  },
  form: { display: "flex", flexDirection: "column" },
}));

export default function AddCoin() {
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Add New Coin
        </Typography>
        <Formik
          initialValues={{ coinName: "", quantity: "", startPrice: "" }}
          // validate={(values) => {
          //   const errors = {};
          //   if (!values.email) {
          //     errors.email = "Required";
          //   } else if (
          //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          //   ) {
          //     errors.email = "Invalid email address";
          //   }
          //   return errors;
          // }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
            dispatch(addCoin(values));
          }}
        >
          {({
            // values,
            // errors,
            // touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className={classes.form}
              noValidate
              autoComplete="off"
            >
              <TextField
                type="text"
                name="coinName"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Coin name"
                // value={values.coinName}
              />
              {/* {errors.email && touched.email && errors.email} */}

              <TextField
                type="text"
                name="quantity"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Quantity"
                // value={values.quantity}
              />
              {/* {errors.password && touched.password && errors.password} */}

              <TextField
                type="text"
                name="startPrice"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Purchase price"
                // value={values.startPrice}
              />
              {/* {errors.password && touched.password && errors.password} */}

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
