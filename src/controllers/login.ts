import express from "express";
const loginRouter = express.Router();
import { UserModel } from "./../schema/userSchema/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user: any = await UserModel.findOne({ email });
  console.log(user);
  const passwordCorrect =
    user === null ? false : bcrypt.compare(password, user.password);

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
export default loginRouter;
