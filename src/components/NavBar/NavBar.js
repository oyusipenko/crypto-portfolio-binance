import React from "react";
import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginBottom: "20px",
    paddingBottom: "10px",
  },
  toolBar: {
    justifyContent: "center",
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        {/* <MenuIcon /> */}
        <div style={{ textAlign: "center" }}>
          <Typography variant="h3"> Crypto Portfolio</Typography>
          <Typography variant="h6">
            Keep track of your coins. Add coins, average the cost.
            <br /> Works for the currency pair "the name of your coin" / BUSD.
            Prices are pulled from the Binance exchange.
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}
