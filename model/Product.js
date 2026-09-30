import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  desc: { type: String },
});

const Product = mongoose.model("Product",productSchema);
export default Product;
