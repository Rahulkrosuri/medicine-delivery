const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true }
});

module.exports = Product = mongoose.model("product", ProductSchema);
