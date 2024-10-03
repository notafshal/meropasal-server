import express from "express";
const productRouter = express.Router();
import { productModel } from "../schema/productSchema/productSchema";
import { UserModel } from "../schema/userSchema/userSchema";

productRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "missing content" });
  }
  const user: any = await UserModel.findById(body.userId);
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
    user: user._id,
  });
  const savedProduct = await product.save();

  user.product = user.product?.concat(savedProduct?._id);
  await user.save().then(res.json("saved"));
});
productRouter.get("/", (req, res) => {
  productModel
    .find({})
    .populate("user", { email: 1, username: 1, password: 1 })
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
//categories
productRouter.get("/categories", (req, res) => {});
export default productRouter;
