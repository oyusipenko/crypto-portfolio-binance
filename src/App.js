import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import AddCoin from "./components/AddCoin/AddCoin";
import AvarageCoinCost from "./components/AvarageCoinCost/AvarageCoinCost";
import PortfolioStatus from "./components/PortfolioStatus/PortfolioStatus";
import MainTable from "./features/MainTable/MainTable";

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="main">
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={3}>
              <AddCoin />
            </Grid>
            <Grid item xs={12} lg={3}>
              <AvarageCoinCost />
            </Grid>
            <Grid item xs={12} lg={3}>
              <PortfolioStatus />
            </Grid>
          </Grid>

          <MainTable />
        </Container>
      </div>
    </div>
  );
}

export default App;
