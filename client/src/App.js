import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { InventoryEditor } from './components/inventory/editor/editor'
import { InventoryViewer } from './components/inventory/viewer/viewer'

import { Reservation } from './components/reservation/reservation'
import { Landing } from './components/landing/landing'
import { styleGen } from './styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark'
  }
});

const useStyles = makeStyles(styleGen)

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <NavigationAppBar></NavigationAppBar>
          <RouteMatcher></RouteMatcher>
        </div>
      </ThemeProvider>
    </Router>
  );
}

function RouteMatcher() {
  return (
    <Switch>
      <Route path="/editInventory">
        <InventoryEditor />
      </Route>
      <Route path="/viewInventory">
        <InventoryViewer />
      </Route>
      <Route path="/reservation">
        <Reservation />
      </Route>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  );
}

function NavigationAppBar() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link variant="h6" color="inherit" noWrap href='/' className={classes.toolbarTitle}>
            Home
          </Link>
          <nav>
            <Link variant="button" color="textPrimary" href='/editInventory' className={classes.link}>
              Edit Inventory
            </Link>
            <Link variant="button" color="textPrimary" href="/reservation" className={classes.link}>
              Reservation
            </Link>
            <Link variant="button" color="textPrimary" href='/viewInventory' className={classes.link}>
              View Inventory
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default App;
