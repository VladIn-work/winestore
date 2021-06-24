import Axios from "axios";

import {
   ORDER_CREATE_FAIL,
   ORDER_CREATE_REQUEST,
   ORDER_CREATE_SUCCESS
} from "../constants/orderConstants";
import {CART_IS_EMPTY} from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
   dispatch({type: ORDER_CREATE_REQUEST, payload: order});
   try {
      const {userLogin:{userInfo}} = getState();
      const {data} = await Axios.post('/api/orders', order,{
         //order is req.payload
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      });
      dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order});
      dispatch({type: CART_IS_EMPTY});
      localStorage.removeItem('cartItems');
   } catch (error) {
      dispatch({type: ORDER_CREATE_FAIL,
         payload:
            error.response && error.response.data.message//web error
               ? error.response.data.message
               : error.message,// general error => network error
      });
   }
};