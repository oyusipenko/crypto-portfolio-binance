import React from "react";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavBar from "./components/NavBar/NavBar";
import AddCoin from "./components/AddCoin/AddCoin";
import CoinActions from "./components/CoinActions/CoinActions";
import PortfolioStatus from "./components/PortfolioStatus/PortfolioStatus";
import Settings from "./components/Settings/Settings";
import TradingWidgets from "./components/TradingWidgets/TradingWidgets";
import MainTable from "./features/MainTable/MainTable";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <PortfolioStatus />
          </Grid>
          <Grid item xs={12} lg={3}>
            <AddCoin />
          </Grid>
          <Grid item xs={12} lg={3}>
            <CoinActions />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Settings />
          </Grid>
          <Grid item xs={12}>
            <MainTable />
          </Grid>
          <Grid item xs={12}>
            <TradingWidgets />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
