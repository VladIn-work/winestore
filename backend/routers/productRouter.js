import express from "express";
import expressAsyncHandler from "express-async-handler";

import Product from "../models/productModel.js";
import data from "../data.js";
import {isAdmin, isAuth} from "../utilities.js";

const productRouter = express.Router();

//api for list of products in frontend --'/'--> added at the end of /api/products in app.use
productRouter.get('/', expressAsyncHandler(async ( req, res) => {
   const products = await Product.find({});
   //empty object returned all list of products
   res.send(products);
}));

//create six products based on data.Product
productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
   //await Product.deleteMany({});
   const createdProducts = await Product.insertMany(data.products);
   res.send({ createdProducts });
}));

//api for product details
productRouter.get('/:id' , expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
       res.send(product);
    } else {
       res.status(404).send({ message: 'Product Not Found'});
    }
 }));


productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res)=> {
   const product = new Product({
      name: 'Chardonnay' + Date.now(), //Date.now eliminates duplicated product name etc.
      year: 2019,
      image: '/images/chardonnay.png',
      certified: "/images/certified-green-5.jpg",
      price: 55,
      brand: 'Dor',
      rating: 0,
      numReviews: 0,
      itemInStock: 12,
      description: 'Chardonnay Traminer is carrying us into a flowery vineyard, offering a complex palette of soft honey flavors and the freshness of green fruits.'
   });
   const createdProduct = await product.save();
   res.send({message: 'Product Created', product: createdProduct});
   //send product to front as a created one
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product) {
        product.name = req.body.name;
        product.year = req.body.year;
        product.image = req.body.image;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.itemInStock = req.body.itemInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
        res.send({message: 'Product Updated Successfully', product: updatedProduct});
    } else {
        res.status(404).send({message: 'Product Can Not Be Found'});
    }
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        const deleteProduct = await product.remove();
        res.send({message: 'Product Deleted Successfully', product: deleteProduct});
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
}));

export default productRouter;