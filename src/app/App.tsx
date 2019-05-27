import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DevicesTable from './devices/DevicesTable';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
  const useStyles = makeStyles(
    createStyles({
      card: {
        minWidth: 275,
        margin: 20,
      },
    }),
  );
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Your Devices
          </Typography>
        </Toolbar>
      </AppBar>
      <Card className={classes.card}>
        <DevicesTable/>
      </Card>
    </div>
  );
}
export default hot(App);
