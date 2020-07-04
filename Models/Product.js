const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  info: String,
  amount: { type: Number, default: 1 },
  image: { type: String, default: 'https://picsum.photos/200' },
});

const Product = mongoose.model('product', ProductSchema);

exports.ProductSchema = ProductSchema;
exports.Product = Product;
