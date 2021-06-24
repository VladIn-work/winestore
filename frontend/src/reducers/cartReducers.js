import {CART_ADD_ITEM, CART_IS_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT} from "../constants/cartConstants";

export const cardReducer = (state = {cartItems:[]}, action) => {
   switch (action.type) {
      case CART_ADD_ITEM:
         const item = action.payload;
         const existItem = state.cartItems.find(num => num.product === item.product);
         //check if the product is in cartItems already
         if (existItem) {
            return {
               ...state,
               cartItems: state.cartItems.map(num => num.product === existItem.product ? item : num),
            };
         } else {
            return {...state, cartItems: [...state.cartItems, item] };
         };
      case CART_REMOVE_ITEM:
         return {
            ...state,
            cartItems: state.cartItems.filter(item => item.product !== action.payload),
            //return true - item.product added to cartItems
         };
      case CART_SAVE_PAYMENT:
         return {
            ...state, paymentMethod: action.payload};
      case CART_IS_EMPTY:
         return {...state, cartItems: []};
      default:
         return state;
   }
};