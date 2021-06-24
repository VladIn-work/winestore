import {
   USER_LOGIN_FAIL,
   USER_LOGIN_REQUEST,
   USER_LOGIN_SUCCESS,
   USER_LOGOUT,
   USER_SIGNUP_FAIL,
   USER_SIGNUP_REQUEST,
   USER_SIGNUP_SUCCESS,
} from "../constants/userConstants";

import  Axios from "axios";

export const signup = (name, email, password) => async (dispatch) => {
   dispatch({type: USER_SIGNUP_REQUEST, payload: {email, password} });
   try {
      const {data} = await Axios.post('/api/users/signup', {name, email, password});
      dispatch({type: USER_SIGNUP_SUCCESS, payload: data});
      dispatch({type: USER_LOGIN_SUCCESS, payload: data});
        //update redux store based on login
      localStorage.setItem('userInfo', JSON.stringify(data));
      //setItem has 2 parameters (1st key 'userinfo') (2nd data 'JSON')
   } catch (error) {
      dispatch({
         type: USER_SIGNUP_FAIL,
         payload:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message, //return general message
      })
   }
};

export const login = (email, password) => async (dispatch) => {
   dispatch({type: USER_LOGIN_REQUEST, payload: {email, password} });
   try {
      const {data} = await Axios.post('/api/users/login', {email, password});
      dispatch({type: USER_LOGIN_SUCCESS, payload: data});
      localStorage.setItem('userInfo', JSON.stringify(data));
      //setItem has 2 parameters (1st key 'userinfo') (2nd data 'JSON')
   } catch (error) {
      dispatch({
         type: USER_LOGIN_FAIL,
         payload:
           error.response && error.response.data.message
             ? error.response.data.message
             : error.message, //return general message
      })
   }
};

export const logout = () => (dispatch) => {
   localStorage.removeItem('userInfo');
   localStorage.removeItem('cartItems');
   dispatch({ type: USER_LOGOUT });
};