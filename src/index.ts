import express, { Express, Request, Response } from "express";
require("dotenv").config();
import mongoose from "mongoose";
import userRouter from "./controllers/users";
import productRouter from "./controllers/products";
const app = express();
const url: any = process.env.MONGO;
app.use(express.json());
mongoose
  .connect(url)
  .then(() => {
    console.log("connection to mongodb Success");
  })
  .catch((err) => {
    console.log("connection failed");
  });

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from express +TS");
});
app.get("/hi", (req: Request, res: Response) => {
  res.send("hello  afshal");
});
const port: any = process.env.PORT;
app.listen(port, () => {
  console.log(`running on port${port}`);
});
