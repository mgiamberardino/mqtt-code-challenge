import * as React from 'react';
import { useDevice } from './Device';
import { TableRow, TableCell, Switch } from '@material-ui/core';

const DeviceRow = ({ id }) => {
  const [device, switchLock, switchPower] = useDevice(id);
  return(
    <React.Fragment>
      <TableRow>
        <TableCell>{id}</TableCell>
        <TableCell>{device.name}</TableCell>
        <TableCell>{device.speed}</TableCell>
        <TableCell>{device.location}</TableCell>
        <TableCell>
          <Switch
            {...useDeviceSwitch(device.locked, switchLock)}
          />
          </TableCell>
        <TableCell>
          <Switch
            {...useDeviceSwitch(device.power === 'on', switchPower)}
          />
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

function useDeviceSwitch(checked, switchFunction) {
  function onChange(e: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    switchFunction();
  }
  return {
    checked,
    onChange,
  };
}

export default DeviceRow;
