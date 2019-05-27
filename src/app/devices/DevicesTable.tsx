import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import DeviceRow from './DeviceRow';
import range from 'lodash.range';

export default function DevicesTable() {
  return (
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
  );
}