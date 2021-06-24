import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";

import {LoadingWindow} from "../components/LoadingWindow";
import {MessageWindow} from "../components/MessageWindow";
import {createProduct, deleteProduct, listProducts} from "../actions/productActions";
import {PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET} from "../constants/productConstants";

export const ProductListView = (props) => {
   const productList = useSelector(state => state.productList);
   const {loading, error, products} = productList;

   const productCreate = useSelector(state => state.productCreate);
   const {
      loading: loadingCreate,
      error: errorCreate,
      success: successCreate,
      product: createdProduct,
   } = productCreate;

   const productDelete = useSelector(state => state.productDelete);
   const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
   } = productDelete;

   const dispatch = useDispatch();
   useEffect(() => {
      if(successCreate) {
         dispatch({type: PRODUCT_CREATE_RESET});
         props.history.push(`/product/${createdProduct._id}/edit`);
      }
      if(successDelete) {
         dispatch({type: PRODUCT_DELETE_RESET});
      }
      dispatch(listProducts());
   }, [createdProduct, dispatch, props.history, successCreate, successDelete]);
   const deleteHandler = (product) => {
      if(window.confirm('Do you want to remove the product?')) {
         dispatch(deleteProduct(product._id));
      }
   };
   const createHandler = () => {
      dispatch(createProduct());
   };
   return (
      <Container>
         <div className="prod-view-admin">
            <div>
               <h1 className="product-view-header">Products</h1>
            </div>
            <div>
               <button
                   type="button"
                   className="form-note-button add-product"
                   onClick={createHandler}>Add Product
               </button>
            </div>
         </div>
         {loadingDelete && <LoadingWindow></LoadingWindow>}
         {errorDelete && <MessageWindow variant="danger">{errorDelete}</MessageWindow>}

         {loadingCreate && <LoadingWindow></LoadingWindow>}
         {errorCreate && <MessageWindow variant="danger">{errorCreate}</MessageWindow>}
         {loading ? (
            <LoadingWindow></LoadingWindow>
         ) : error ? (
            <MessageWindow variant="danger">{error}</MessageWindow>
         ) : (
             <div className="table-responsive">
                <table className="table">
                   <thead>
                   <tr>
                      <th>PRODUCT ID</th>
                      <th>NAME</th>
                      <th>YEAR</th>
                      <th>PRICE</th>
                      <th>BRAND</th>
                      <th>ACTIONS</th>
                   </tr>
                   </thead>
                   <tbody className="responsive">
                   {products.map((product) => (
                       <tr key={product._id}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.year}</td>
                          <td>{product.price}</td>
                          <td>{product.brand}</td>
                          <td className="table-cell">
                             <button
                                 type="button"
                                 className="form-note-button edit"
                                 onClick={() =>
                                     props.history.push(`/product/${product._id}/edit`)
                                 }
                             >
                                Edit
                             </button>
                             <button
                                 type="button"
                                 className="form-note-button delete"
                                 onClick={() => deleteHandler(product)}
                             >
                                Delete
                             </button>
                          </td>
                       </tr>
                   ))}
                   </tbody>
                </table>
             </div>

         )}
      </Container>
   );
}