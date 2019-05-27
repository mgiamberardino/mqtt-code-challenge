import * as React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Devices from './devices/Devices';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Your Devices
          </Typography>
        </Toolbar>
      </AppBar>
      <Devices/>
    </div>
  );
}
hot

export default hot(App);
