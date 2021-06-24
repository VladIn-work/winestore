import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import orderRouter from "./routers/orderRouter.js";

dotenv.config();

const app = express();
app.use(express.json()); // add new middleware
app.use(express.urlencoded({ extended: true })); // for parsing

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/winestore', {
    useNewUrlParser: true, // deprecated warnings
    useUnifiedTopology: true,
    useCreateIndex: true,
});



app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server listen at http://localhost:${port}`);
});