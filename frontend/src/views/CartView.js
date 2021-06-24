import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {Card, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {addToCart, removeFromCart} from "../actions/cartActions";
import {MessageWindow} from "../components/MessageWindow";


export const CartView = (props) => {
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;

    const cart = useSelector((state) =>state.cart);
    const {cartItems} = cart;

    const dispatch = useDispatch();
    useEffect(() => {
       if (productId) {
          dispatch(addToCart(productId, qty));
       }
    }, [dispatch, productId, qty]);

    const removeFromCartHandler = (id) => {
       //delete
       dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
       props.history.push('/login?redirect=payment');
    };

    return (
        <Container>
            <Row>
               <Col className="flex-column shop-basket row">
                  <h2 className="rows">Shopping Basket</h2>
                  {cartItems.length === 0 ? <MessageWindow>
                       <span className="rows-text">Basket is empty </span><Link to="/" className="rows-shop" >Go Shopping</Link>
                  </MessageWindow>
                  :
                  (
                    <ul>
                       {
                          cartItems.map((item) => (
                            <li key={item.product}>
                               <div className="rows wrap wrap-items">
                                  <div>
                                     <img src={item.image} alt={item.name} className="small"></img>
                                  </div>
                                  <div className="min move">
                                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                                  </div>
                                  <div>
                                     <select className="select move"
                                       value={item.qty}
                                       onChange={(evt) =>
                                         dispatch(
                                           addToCart(item.product, Number(evt.target.value))
                                         )
                                       }
                                     >
                                        {[...Array(item.itemInStock).keys()].map(item => (
                                            <option key={item + 1} value={item + 1}>{item + 1}</option>
                                          )
                                        )}
                                     </select>
                                  </div>
                                  <div className="move">${item.price}</div>
                                  <div>
                                     <button type="button" onClick={() => removeFromCartHandler(item.product)}
                                     className="cart-view move"> Delete </button>
                                  </div>
                               </div>
                            </li>
                          ))}
                    </ul>
                  )}
               </Col>
               <Row>
                  <Card className="card sub-head">
                     <ul>
                        <li>
                           <h2 className="subtotal">
                              Subtotal ({cartItems.reduce((acumul, current) => acumul + current.qty, 0)} items) $
                              {cartItems.reduce((acumul, current) => acumul + current.price * current.qty, 0)}
                           </h2>
                        </li>
                        <li>
                           <button
                             type="button"
                             onClick={checkoutHandler}
                             className="cart-view"
                             disabled={cartItems.length === 0}
                           >
                              Proceed to Checkout
                           </button>
                        </li>
                     </ul>
                  </Card>
               </Row>
            </Row>
        </Container>
    );
}