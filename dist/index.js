"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./controllers/users"));
const products_1 = __importDefault(require("./controllers/products"));
const app = (0, express_1.default)();
const login_1 = __importDefault(require("./controllers/login"));
const middleware_1 = __importDefault(require("./config/middleware"));
const cors_1 = __importDefault(require("cors"));
const url = process.env.MONGO;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("connection to mongodb Success");
})
    .catch((err) => {
    console.log("connection failed");
});
app.use(middleware_1.default);
app.use("/api/users", users_1.default);
app.use("/api/product", products_1.default);
app.use("/api/login", login_1.default);
app.get("/", (req, res) => {
    res.send("Hello from express +TS");
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`running on port${port}`);
});
