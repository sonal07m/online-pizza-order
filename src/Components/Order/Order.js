import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getHistoryOfOrder } from '../../Redux/apiCall';
import CircularProgress from '@material-ui/core/CircularProgress';
// This component shows the items user checked out from the cart.
const ConnectedOrder = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let orderHistory = useSelector((state) => state.orderHistory || []);
  const fetchData2 = async () => {
    await dispatch(getHistoryOfOrder());
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getHistoryOfOrder());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  fetchData2();
  if (loading) {
    return <CircularProgress className="circular" />;
  }
  console.log('props.orderHistory', orderHistory);
  return (
    <div style={{ padding: 10 }}>
      <div style={{ fontSize: 24, marginTop: 10 }}>Order summary</div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>User name</TableCell>
            <TableCell>Item name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderHistory.map((item) => {
            const date = new Date(item.createdAt);
            return (
              <TableRow key={item.id}>
                <TableCell>{date.toLocaleDateString()}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.pizzaName}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.totalAmount}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.totalAmount * item.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button
        color="primary"
        variant="outlined"
        onClick={()=>{props.history.push('/');}}
        style={{ margin: 5, marginTop: 30 }}
      >
        Back to Home
      </Button>
    </div>
  );
};

export default ConnectedOrder;
