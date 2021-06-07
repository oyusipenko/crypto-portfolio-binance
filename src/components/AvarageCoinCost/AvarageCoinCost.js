import React from "react";
import { useDispatch } from "react-redux";
import { addCoin } from "../../features/MainTable/MainTableSlice";
import { Formik } from "formik";
import "./AvarageCoinCost.scss";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
  dropdown: {
    marginTop: "16px",
  },
}));

export default function AvarageCoinCost() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Avarage Coin Cost
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
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                onChange={handleChange}
                className={classes.dropdown}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
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
