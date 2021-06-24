import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import "font-awesome/css/font-awesome.css";
import {Rating} from "./Rating";



export const Product = (props) => {
    const {product} = props;

    return (
        <Card key={product._id} className="col-md-6 col-lg-4 justify-content-between custom">
            <Card className="border-0">
                    <Link to={`/product/${product._id}`}>
                        <img src={product.certified} className="certified" alt={product.category} />
                    </Link>
                    <Link to={`/product/${product._id}`}>
                        <img src={product.image} className ="img-fluid" alt={product.name} />
                    </Link>
            </Card>
            <div className="bottle">
                <Link to={`/product/${product._id}`}>
                </Link>
                <h2 className="prod-header">{product.name}</h2>
                <div className="price">${product.price}</div>
            </div>
            <Rating
                rating={product.rating}
                numReviews={product.numReviews}
            ></Rating>
        </Card>
    )
};

