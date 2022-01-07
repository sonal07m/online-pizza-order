import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { setLoggedInUser } from '../../Redux/Actions';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { sendOrder } from '../../Redux/apiCall';

const ConnectedLogin = (props) => {
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [wrongCred] = useState(false);
  const dispatch = useDispatch();
  const checkedOutItems = useSelector((state) => state.checkedOutItems);
  if (redirectToReferrer === true) {
    return <Redirect to={'order'} />;
  }
  console.log('checkedOutItems', props.checkedOutItems);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',

        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: 300,
          width: 200,
          padding: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Avatar style={{ marginBottom: 10 }}>
          <LockOutlinedIcon />
        </Avatar>
        <div
          style={{
            marginBottom: 20,
            fontSize: 24,
            textAlign: 'center',
          }}
        >
          {' '}
          Log in{' '}
        </div>
        <TextField
          value={userName}
          placeholder="User name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          value={address}
          type="Address"
          placeholder="Address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <TextField
          value={phone}
          type="Phone"
          placeholder="Phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <Button
          style={{ marginTop: 20, width: 200 }}
          variant="outlined"
          color="primary"
          onClick={() => {
            let regMobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
            if (userName && address && regMobile.test(phone)) {
              const orderList = checkedOutItems.map((item) => {
                const order = {
                  name: userName,
                  phone,
                  address,
                  totalAmount: item.price,
                  pizzaName: item.name,
                  quantity: item.quantity,
                };
                dispatch(sendOrder(order));
              });
              dispatch(setLoggedInUser({ name: userName }));
              setRedirectToReferrer(true);
            } else {
              let regMobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
              if (!userName || !address) {
                alert('Please enter all information');
              } else if (!regMobile.test(phone)) {
                alert('Phone no must be 10 digit');
              }
            }
          }}
        >
          Log in
        </Button>
        {wrongCred && <div style={{ color: 'red' }}>Wrong username and/or password</div>}
      </div>
    </div>
  );
};

export default ConnectedLogin;
