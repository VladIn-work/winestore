import React, { useEffect } from "react";
import {Row, Col} from "react-bootstrap";


import {Product} from "./Product";
import {MessageWindow} from "./MessageWindow";
import {LoadingWindow} from "./LoadingWindow";
import {useDispatch, useSelector} from "react-redux";
import {listProducts} from "../actions/productActions";



export const Home = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products} = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <>
            { loading ? ( <LoadingWindow /> )
                : error ? ( <MessageWindow>{error}</MessageWindow> )
                    :
                ( <Row className="container top-head">
                    <Col className="row">
                        {
                            products.map(product => (
                                <Product key={product._id} product={product}></Product>
                            ))
                        }
                    </Col>
                </Row>
                )
            }
        </>
  )
};

