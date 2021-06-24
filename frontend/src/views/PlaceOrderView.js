import React, {useEffect} from "react";
import {Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../actions/orderActions";
import {ORDER_CREATE_RESET} from "../constants/orderConstants";
import {LoadingWindow} from "../components/LoadingWindow";
import {MessageWindow} from "../components/MessageWindow";

export const PlaceOrderView = (props) => {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));//9.123 => "9.12" => 9.12
    //toFixed = "9.12" , Number = 9.12 converts
    cart.goodsPrice = toPrice(
        cart.cartItems.reduce((acum, current) => acum + current.qty * current.price, 0)
        //default value for acum is 0
    );
    cart.taxPrice = toPrice(0.17 * cart.goodsPrice)
    cart.totalPrice = cart.goodsPrice + cart.taxPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems }));
    }
    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, props.history, success]);
    return (
        <Container>
            <div className="form prod-one">
                <div className="car-body">
                    <ul>
                        <li>
                            <h2 className="form-header">Order Review</h2>
                        </li>
                        <li className="form-groups">
                            <div className="wrap">
                                <div>Items</div>
                                <div>${cart.goodsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li className="form-groups">
                            <div className="wrap">
                                <div>Tax</div>
                                <div>${cart.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li className="form-groups">
                            <div className="wrap">
                                <div>
                                    <strong>Total Order</strong>
                                </div>
                                <div>
                                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                                </div>
                            </div>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={placeOrderHandler}
                                className="form-note-button"
                                disabled={cart.cartItems.length === 0}
                            >Place Order</button>
                        </li>
                        { loading && <LoadingWindow></LoadingWindow> }
                        {error && <MessageWindow variant="danger">{error}</MessageWindow>}
                    </ul>
                </div>
            </div>
        </Container>
    )
};