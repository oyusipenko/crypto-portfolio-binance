import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  downloadData,
  uploadData,
  loadDemoData,
  clearAllData,
} from "./walletSlice";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
    display: "flex",
    flexDirection: "column",
    minHeight: "287px",
    justifyContent: "space-between",
    textAlign: "center",
  },
  button: {
    display: "block",
    width: "100%",
  },
}));

export default function Settings() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    function onChange(event) {
      const reader = new FileReader();
      reader.onload = onReaderLoad;
      reader.readAsText(event.target.files[0]);
    }
    function onReaderLoad(event) {
      const obj = JSON.parse(event.target.result);
      const toDispatch = JSON.parse(obj);
      dispatch(uploadData(toDispatch));
      localStorage.setItem("userCoins", obj);
    }
    document.getElementById("file").addEventListener("change", onChange);
    return () => {
      document.getElementById("file").removeEventListener("change", onChange);
    };
  });

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" color="textSecondary">
          Data settings
        </Typography>
        <Button
          id="downloadAnchorElem"
          onClick={() => {
            dispatch(downloadData());
          }}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Download your data
        </Button>

        <Button
          component="label"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Upload your data
          <input type="file" id="file" accept=".json" hidden />
        </Button>
        <Button
          onClick={() => {
            dispatch(loadDemoData());
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Load demo data
        </Button>
        <Button
          id="clearStorage"
          onClick={() => {
            dispatch(clearAllData());
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Clear all data
        </Button>
      </CardContent>
    </Card>
  );
}
