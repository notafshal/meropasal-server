import express from "express";
require("dotenv").config();
const userRouter = express.Router();
import { UserModel } from "./../schema/userSchema/userSchema";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";

userRouter.get("/", (req, res) => {
  UserModel.find({})
    .populate("product", {
      title: 1,
      price: 1,
      description: 1,
      category: 1,
      image: 1,
      rating: {
        rate: 1,
        count: 1,
      },
    })
    .then((users) => {
      res.json(users);
    });
});

userRouter.get("/:id", (req, res, next) => {
  UserModel.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});
userRouter.post("/register", async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "missing content" });
  }

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = new UserModel({
    email: body.email,
    username: body.username,
    password: hashedPassword,
  });
  user
    .save()
    .then((savedUser) => {
      savedUser.toObject();
      res.json(savedUser);
    })
    .catch((err) => res.send(err));
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({ error: "invalid email or password" });
  }
  const userToken = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(userToken, process.env.JWT_SECRET || "defaultSecret");
  res.status(200).send({ token, email: user.email, username: user.username });
});
export default userRouter;
