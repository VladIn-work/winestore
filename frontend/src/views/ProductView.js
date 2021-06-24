import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Nav, Container, Row, Col} from "react-bootstrap";
//import {Footer} from "../components/Footer";
import {Rating} from "../components/Rating";
import {LoadingWindow} from "../components/LoadingWindow";
import {MessageWindow} from "../components/MessageWindow";
import {detailsProducts} from "../actions/productActions";


export const ProductView = (props) => {
   const dispatch = useDispatch();
   const productId = props.match.params.id;
   const [qty, setQty] = useState(1);
   const productDetails = useSelector ((state) => state.productDetails);
   const { loading, product, error} = productDetails;

   useEffect(() => {
      dispatch(detailsProducts(productId));
   }, [dispatch, productId]);

   const addToCartHandler = () => {
      props.history.push(`/cart/${productId}?qty=${qty}`);
   };

   return (
     <>
        { loading ? ( <LoadingWindow /> )
          : error ? ( <MessageWindow>{error}</MessageWindow>
          ) : (
            <Container className="containe">
               <Row>
                  <Nav.Item className="back-results"><Nav.Link href="/">Back to Products</Nav.Link></Nav.Item >
               </Row>
               <Row className="row row-wrap bg-wrapper">
                  <Col md={12} lg={6} xlg={6} className="common">
                     <div className="size">
                        <img src={product.certified} className="certified" alt={product.category} />
                        <img src={product.image} className="product-img" alt={product.name}></img>
                     </div>
                  </Col>
                  <Col md={7} lg={3} xlg={3} className="prod-one right">
                     <div className="rounded">
                        <ul>
                           <li>
                              <h2 className="bottle-header">{product.name}</h2>
                           </li>
                           <li>
                              Brand: {product.brand}
                              <p>Production Year: {product.year}</p>
                           </li>
                           <li>
                              Description:
                              <p>{product.description}</p>
                           </li>
                           <li>
                              <Rating
                                rating = {product.rating}
                                numReviews = {product.numReviews}
                              ></Rating>
                           </li>
                        </ul>
                     </div>
                  </Col>

                  <Col md={5} lg={3} xlg={3} className="prod-one left">
                     <div className="basket rounded">
                        <ul>
                           <li>
                              <div className="wrap">
                                 <div>Price</div>
                                 <div className="amount">${product.price}</div>
                              </div>
                           </li>
                           <li>
                              <div className="wrap wrap-items">
                                 <div>Product</div>
                                 <div>
                                    {product.itemInStock > 0 ? (
                                      <span className="green">Available</span>
                                    ) : (
                                      <span className="red">Out of Stock</span>
                                    )}
                                 </div>
                              </div>
                           </li>
                           {
                              product.itemInStock > 0 && (
                                <>
                                   <li>
                                      <div className="wrap">
                                         <div>Select</div>
                                         <div>
                                            <select value={qty} onChange={evt => setQty(evt.target.value)} className="select">
                                               {[...Array(product.itemInStock).keys()].map(item => (
                                                   <option key={item + 1} value={item + 1}>{item + 1}</option>
                                                 )
                                               )}
                                            </select>
                                         </div>
                                      </div>
                                   </li>
                                   <li>
                                      <button onClick={addToCartHandler} type="button" className="note">Add to Basket</button>
                                   </li>
                                </>
                              )
                           }
                        </ul>
                     </div>
                  </Col>
               </Row>
            </Container>
          )
        }
     </>
   );
}
