import React from "react";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import NavBar from "./NavBar/NavBar";
import AddCoin from "../features/wallet/AddCoin";
import CoinActions from "../features/wallet/CoinActions";
import PortfolioStatus from "../features/wallet/PortfolioStatus";
import Settings from "../features/wallet/Settings";
import TradingWidgets from "./TradingWidgets/TradingWidgets";
import MainTable from "../features/wallet/MainTable";

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
