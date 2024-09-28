import express from "express";
const productRouter = express.Router();
import { productModel } from "../schema/productSchema/productSchema";
import { UserModel } from "../schema/userSchema/userSchema";

productRouter.post("/", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "missing content" });
  }
  const product = new productModel({
    title: body.title,
    price: body.price,
    description: body.description,
    category: body.category,
    image: body?.image,
    rating: {
      rate: body.rating.rate,
      count: body.rating.count,
    },
  });
  product
    .save()
    .then((postedProduct) => {
      res.json(postedProduct);
    })
    .catch((err) => res.json(err));
});
productRouter.get("/", (req, res) => {
  productModel
    .find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.json(err));
});
productRouter.get("/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.json(err));
});
export default productRouter;
