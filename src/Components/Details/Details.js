import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addItemInCart } from '../../Redux/Actions';
import Item from '../Item/Item';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { getPizzaItem, getPizzaItemByID } from '../../Redux/apiCall';

const ConnectedDetails = (props) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [isCompMounted, setIsCompMounted] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsCompMounted(true);
    const fetchProductAndRelatedItems = async (productId) => {
      setItemLoading(true);
      dispatch(getPizzaItem()).then((response) => {
        let itemData;
        dispatch(getPizzaItemByID(productId)).then((res) => {
          itemData = res.data.result;
          let relatedItems = response;
          // Make sure this component is still mounted before we set state..
          if (isCompMounted) {
            setItem(itemData);
            setQuantity(1);
            setItemLoading(false);
            setRelatedItems(relatedItems.filter((x) => x.id !== itemData.id));
          }
        });
      });
    };
    fetchProductAndRelatedItems(props.match.params.id);
    return () => {
      setIsCompMounted(false);
    };
  }, [props.match.params.id, dispatch, isCompMounted]);

  if (itemLoading) {
    return <CircularProgress className="circular" />;
  }

  if (!item) {
    return null;
  }
  console.log('item', item);
  return (
    <div style={{ padding: 10 }}>
      <div
        style={{
          marginBottom: 20,
          marginTop: 10,
          fontSize: 22,
        }}
      >
        {item.name}
      </div>
      <div style={{ display: 'flex' }}>
        <img
          src={`https://pizaa-56z.herokuapp.com/${item.image}`}
          alt=""
          width={250}
          height={250}
          style={{
            border: '1px solid lightgray',
            borderRadius: '5px',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            flex: 1,
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              fontSize: 16,
            }}
          >
            Price: {item.price} $
          </div>
          {item.popular && (
            <div style={{ fontSize: 14, marginTop: 5, color: '#228B22' }}>(Popular product)</div>
          )}

          <TextField
            type="number"
            value={quantity}
            style={{ marginTop: 20, marginBottom: 10, width: 70 }}
            label="Quantity"
            inputProps={{ min: 1, max: 10, step: 1 }}
            onChange={(e) => {
              setQuantity(parseInt(e.target.value));
            }}
          />
          <Button
            style={{ width: 170, marginTop: 5 }}
            color="primary"
            variant="outlined"
            onClick={() => {
              dispatch(
                addItemInCart({
                  ...item,
                  quantity: quantity,
                })
              );
            }}
          >
            Add to Cart <AddShoppingCartIcon style={{ marginLeft: 5 }} />
          </Button>
        </div>
      </div>

      {/* Product description */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 22,
        }}
      >
        Product Description
      </div>
      <div
        style={{
          maxHeight: 200,
          fontSize: 13,
          overflow: 'auto',
        }}
      >
        {item.description ? item.description : 'Not available'}
      </div>

      {/* Relateditems */}
      <div
        style={{
          marginTop: 20,
          marginBottom: 10,
          fontSize: 22,
        }}
      >
        Related Items
      </div>
      {relatedItems.slice(0, 3).map((x) => {
        return <Item key={x.id} item={x} />;
      })}
    </div>
  );
};
export default ConnectedDetails;
