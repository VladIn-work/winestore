import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import {isAuth} from "../utilities.js";

const orderRouter = express.Router();

orderRouter.post(
   '/',
   isAuth,
   expressAsyncHandler(async (req, res) => {
   if(req.body.orderItems.length === 0) {
      res.status(400).send({message: 'Basket is empty '})
   } else {
      const order = new Order({
         orderItems: req.body.orderItems,
         paymentMethod: req.body.paymentMethod,
         goodsPrice: req.body.goodsPrice,
         taxPrice: req.body.taxPrice,
         totalPrice: req.body.totalPrice,
         user: req.user._id,
         //call isAuth req.user will get user info
      });
      const createdOrder = await order.save();
      res.status(201).send({message: 'New Order Created', order: createdOrder});
      //send to front order with createdOrder
   }
}));

export default orderRouter;