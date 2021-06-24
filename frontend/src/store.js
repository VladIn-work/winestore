import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import {
    productCreateReducer, productDeleteReducer,
    productDetailsReducer,
    productListReducer,
    productUpdateReducer
} from "./reducers/productReducers";
import { cardReducer } from "./reducers/cartReducers";
import {userLoginReducer, userSignupReducer} from "./reducers/userReducer";
import {orderCreateReducer} from "./reducers/orderReducer";

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo')
          ? JSON.parse(localStorage.getItem('userInfo')) : null,
    },
    cart: {
        cartItems: localStorage.getItem('cartItems')
          ? JSON.parse(localStorage.getItem('cartItems')) : [],
        paymentMethod: 'ApplePay',
    },
};
const reducer = combineReducers ({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cardReducer,
    userLogin: userLoginReducer,
    userSignup: userSignupReducer,
    orderCreate: orderCreateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
});


const composeEnhancer = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

//export default store;