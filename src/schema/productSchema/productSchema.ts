import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: {
      type: Number,
    },
    count: { type: Number },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
productSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
export const productModel = mongoose.model("Product", productSchema);
