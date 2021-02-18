const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  _products: [{ type: Schema.ObjectId, ref: "Products" }]
});

module.exports = Medicine = mongoose.model("medicine", medicineSchema);
