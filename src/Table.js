import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;

class SimpleTable extends React.Component {

state = {
    total:0
};

render() {
  console.log('TableData', this.props)
  const { classes ,data,makelist} = this.props;
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Item Selected</TableCell>
            <TableCell numeric>	Price of the item</TableCell>
            <TableCell numeric>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell component="th" scope="row">{n.label}
                </TableCell>
                <TableCell numeric>{n.value}</TableCell>
                <TableCell numeric>
                <TextField
                            id="search"
                            label="quantity"
                            value = {n.quantity}
                            onChange = {(e) => makelist(n,e)}
                            className={classes.textField}
                            margin="normal"

                        />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);