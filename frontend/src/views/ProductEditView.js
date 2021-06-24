import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {detailsProducts, updateProduct} from "../actions/productActions";
import {Container, Form, FormGroup, FormLabel} from "react-bootstrap";
import {LoadingWindow} from "../components/LoadingWindow";
import {MessageWindow} from "../components/MessageWindow";
import {PRODUCT_UPDATE_RESET} from "../constants/productConstants";

export const ProductEditView = (props) => {
   const productId = props.match.params.id;
   const [name, setName] = useState('');
   const [year, setYear] = useState('');
   const [image, setImage] = useState('');
   const [price, setPrice] = useState('');
   const [brand, setBrand] = useState('');
   const [itemInStock, setItemInStock] = useState('');
   const [description, setDescription] = useState('');

   const productDetails = useSelector(state => state.productDetails);
   const {loading, error, product} = productDetails;

   const productUpdate = useSelector(state => state.productUpdate);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate} = productUpdate;

   const dispatch = useDispatch();
   useEffect(() => {
      if (successUpdate) {
         dispatch({type: PRODUCT_UPDATE_RESET});
         props.history.push('/productlist');
      }
      if(!product || product._id !== productId) {
         //edit and add-product loads separately
         dispatch(detailsProducts(productId));
         //load from backend when null
      } else {
         setName(product.name);
         setYear(product.year);
         setImage(product.image);
         setPrice(product.price);
         setBrand(product.brand);
         setItemInStock(product.itemInStock);
         setDescription(product.description);
      }
   }, [product, dispatch, productId, props.history, successUpdate])

   const submitHandler = (event) => {
      event.preventDefault();
      dispatch(updateProduct({_id: productId,
      name, year, image, price, brand, itemInStock, description})
      );
   };
   return (
      <Container>
         <Form className="form" onSubmit={submitHandler}>
            <FormGroup>
               <h1 style={{textAlign: "center"}}> Edit Product </h1>
               <h2 className="form-groups">Product ID: {productId}</h2>
            </FormGroup>
               {loadingUpdate && <LoadingWindow></LoadingWindow>}
               {errorUpdate && <MessageWindow variant="danger">{errorUpdate}</MessageWindow>}
               { loading ? <LoadingWindow></LoadingWindow>
                     :
                  error ? <MessageWindow variant="danger">{error}</MessageWindow>
                     :
                     <>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="name">Name</FormLabel>
                           <Form.Control className="form-control"
                                         id="name"
                                         type="text"
                                         placeHolder="Enter name"
                                         value={name}
                                         onChange={(evt) => setName(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="year">Year</FormLabel>
                           <Form.Control className="form-control"
                                         id="year"
                                         type="text"
                                         placeHolder="Enter Year"
                                         value={year}
                                         onChange={(evt) => setYear(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="image">Image</FormLabel>
                           <Form.Control className="form-control"
                                         id="image"
                                         type="text"
                                         placeHolder="Image"
                                         value={image}
                                         onChange={(evt) => setImage(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="price">Price</FormLabel>
                           <Form.Control className="form-control"
                                         id="price"
                                         type="text"
                                         placeHolder="Enter Price"
                                         value={price}
                                         onChange={(evt) => setPrice(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="brand">Brand</FormLabel>
                           <Form.Control className="form-control"
                                         id="brand"
                                         type="text"
                                         placeHolder="Enter Brand"
                                         value={brand}
                                         onChange={(evt) => setBrand(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="itemInStock">Item in Stock</FormLabel>
                           <Form.Control className="form-control"
                                         id="itemInStock"
                                         type="text"
                                         placeHolder="Enter itemInStock"
                                         value={itemInStock}
                                         onChange={(evt) => setItemInStock(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup className="form-groups">
                           <FormLabel htmlFor="description">Description</FormLabel>
                           <Form.Control as="textarea" rows={3} className="form-control"
                                         id="description"
                                         type="text"
                                         placeHolder="Enter Description"
                                         value={description}
                                         onChange={(evt) => setDescription(evt.target.value)}
                           />
                        </FormGroup>
                        <FormGroup>
                           <FormLabel />
                           <button className="form-note-button" type="submit">
                              Update
                           </button>
                        </FormGroup>
                     </>
               }
         </Form>
      </Container>
   )
};