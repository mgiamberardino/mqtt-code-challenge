import * as React from 'react';
import { Paper, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import DeviceRow from './DeviceRow';
import range from 'lodash.range';

export default function Devices(props) {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Locked</TableCell>
              <TableCell>Power</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {range(1,11).map((id: number) => (<DeviceRow id={id} key={id} />))}
          </TableBody>
        </Table>
      </Paper>
    );
}