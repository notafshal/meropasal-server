"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./controllers/users"));
const app = (0, express_1.default)();
const url = process.env.MONGO;
app.use(express_1.default.json());
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("connection to mongodb Success");
})
    .catch((err) => {
    console.log(err);
});
app.use("/api/users", users_1.default);
app.get("/", (req, res) => {
    res.send("Hello from express +TS");
});
app.get("/hi", (req, res) => {
    res.send("hello  afshal");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`running on port${port}`);
});
