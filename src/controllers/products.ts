import express from "express";
const productRouter = express.Router();
import { productModel } from "../schema/productSchema/productSchema";
import { UserModel } from "../schema/userSchema/userSchema";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { decode } from "punycode";
require("dotenv").config();

const getToken = (req: any) => {
  const auth = req.get("authorization");
  if (auth && auth.startsWith("Bearer ")) {
    return auth.replace("Bearer ", "");
  }
  return null;
};

productRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: "missing content" });
  }

  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  let decodedToken: string | JwtPayload;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");
  } catch (err) {
    return res.status(401).json({ error: "invalid or expired token" });
  }

  if (typeof decodedToken === "object" && "id" in decodedToken) {
    const userId = (decodedToken as JwtPayload).id;

    const user: any = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const product = new productModel({
      title: body.title,
      price: body.price,
      description: body.description,
      category: body.category,
      image: body?.image,
      rating: {
        rate: body.rating?.rate || 0,
        count: body.rating?.count || 0,
      },
      user: user._id,
    });

    const savedProduct = await product.save();
    user.product = user.product?.concat(savedProduct._id);
    await user.save();

    return res.json({
      message: "Product saved successfully",
      product: savedProduct,
    });
  } else {
    return res.status(401).json({ error: "invalid token payload" });
  }
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
