import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { connect, useSelector } from 'react-redux';
import { showCartDlg, setCheckedOutItems } from '../../Redux/Actions';
import { withRouter } from 'react-router-dom';
import CartRow from './CartRow';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCartOutlined';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const ConnectedCartDialog = (props) => {
  const open = useSelector((state) => state.showCartDialog);
  const items = useSelector((state) => state.cartItems);
  let totalPrice = items.reduce((accumulator, item) => {
    return accumulator + item.price * item.quantity;
  }, 0);

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => {
          props.dispatch(showCartDlg(false));
        }}
      >
        <AppBar position="static" style={{ backgroundColor: '#3863aa' }}>
          <Toolbar>
            <ShoppingCartIcon fontSize="large" style={{ color: 'white', marginRight: 20 }} />
            Shopping Cart
          </Toolbar>
        </AppBar>

        <div
          style={{
            maxHeight: 400,
            padding: 10,
            overflow: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return <CartRow item={item} key={item.id} {...props} />;
              })}
            </TableBody>
          </Table>
        </div>

        <div style={{ display: 'flex', padding: 20, alignItems: 'center' }}>
          <div
            style={{
              flex: 1,
            }}
          >
            {' '}
            Total Price: {totalPrice} $
          </div>
          <Button
            variant="outlined"
            color="primary"
            disabled={totalPrice === 0}
            onClick={() => {
              props.dispatch(showCartDlg(false));
              props.dispatch(setCheckedOutItems(items));
              props.history.push('/login');
            }}
          >
            Checkout
          </Button>
        </div>
      </Dialog>
    </div>
  );
};
export default withRouter(connect()(ConnectedCartDialog));
