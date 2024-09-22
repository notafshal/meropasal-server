import express from "express";
const userRouter = express.Router();
import { UserModel } from "./../schema/userSchema/userSchema";
userRouter.get("/", (req, res) => {
  UserModel.find({}).then((users) => {
    res.json(users);
  });
});
userRouter.post("/register", (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ error: "missing content" });
  }
  const user = new UserModel({
    email: body.email,
    username: body.username,
    password: body.password,
  });
  user
    .save()
    .then((savedUser) => {
      savedUser.toObject();
      res.json(savedUser);
    })
    .catch((err) => res.send(err));
});
export default userRouter;
