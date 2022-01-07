import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import { useSelector, useDispatch } from 'react-redux';
import { showCartDlg, toggleMenu } from '../../Redux/Actions';
import cartImage from '../../Images/logo2.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Option items for product categories.

const ConnectedHeader = () => {
  const dispatch = useDispatch();
  const nrOfItemsInCard = useSelector((state) => state.cartItems.length);

  return (
    <AppBar position="static" style={{ backgroundColor: '#FAFAFB', padding: 10 }}>
      <Toolbar>
        <div className="left-part">
          <IconButton
            onClick={() => {
              dispatch(toggleMenu());
            }}
          >
            <MenuIcon size="medium" />
          </IconButton>

          <img src={cartImage} alt={'Logo'} style={{ marginLeft: 10 }} />
        </div>
        <div className="right-part">
          <IconButton
            aria-label="Cart"
            onClick={() => {
              dispatch(showCartDlg(true));
            }}
          >
            <Badge badgeContent={nrOfItemsInCard} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default ConnectedHeader;
