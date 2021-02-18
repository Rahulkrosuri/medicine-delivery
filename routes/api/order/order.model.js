const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const OrderSchema = new Schema({
  total_amount: { type: Number, required: true },
  status: { type: String, required: true, default: "placed" },
  created_at: {
    type: Date,
    default: Date.now
  },
  _products: [{ type: Schema.ObjectId, ref: "Product" }],
  _user: { type: Schema.ObjectId, ref: "User" },
  _medicine: { type: Schema.ObjectId, ref: "Medicine" }
});

module.exports = Order = mongoose.model("Order", OrderSchema);
