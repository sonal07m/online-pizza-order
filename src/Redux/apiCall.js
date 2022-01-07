import axios from 'axios';

export const getPizzaItem = () => (dispatch) => {
  return axios
    .get('https://pizaa-56z.herokuapp.com/product')
    .then((response) => {
      dispatch({
        type: 'GET_PIZZA_ITEM',
        payload: response.data.result,
      });
      return response.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getPizzaItemByID = (id) => () => {
  return axios.get(`https://pizaa-56z.herokuapp.com/product/${id}`);
};
export const getHistoryOfOrder = () => (dispatch) => {
  return axios
    .get(`https://pizaa-56z.herokuapp.com/history`)
    .then((res) => {
      dispatch({
        type: 'GET_ORDER_HISTORY',
        payload: res.data.result,
      });
      return res.data.result;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const sendOrder = (item) => () => {
  return axios
    .post('https://pizaa-56z.herokuapp.com/history', item)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
