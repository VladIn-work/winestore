import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   name: { type: String, required: true, unique: true },
   year: { type: Number, required: true },
   image: { type: String, required: true },
   certified: { type: String, required: true },
   price: { type: Number, required: true },
   brand: { type: String, required: true },
   rating: { type: Number, required: true },
   numReviews:{ type: Number, required: true },
   itemInStock: { type: Number, required: true },
   description: { type: String, required: true },
  }, {
     timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;