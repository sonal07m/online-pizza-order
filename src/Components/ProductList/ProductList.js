import React, { useState, useEffect } from 'react';
import Item from '../Item/Item';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductsHeader from '../ProductsHeader/ProductsHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getPizzaItem } from '../../Redux/apiCall';
const PizzaItems = (props) => {
  console.log('props', props);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const pizzaItems = useSelector((state) => state.pizzaItem);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getPizzaItem());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress className="circular" />;
  }
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <ProductsHeader totalItemsCount={pizzaItems.length} />

      <div style={{ flex: 1 }}>
        {pizzaItems.map((item) => {
          return <Item key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default PizzaItems;
