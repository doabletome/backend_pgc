import express, { urlencoded } from "express";
import mongoose from "mongoose";
import ProductRouter from "./Routers/productRoutes.js";
import cartRouter from "./Routers/cartRoutes.js";
import userRouter from "./Routers/userRoutes.js";
import { userAuth } from "./middleware/userAuth.js";

mongoose.connect("mongodb://127.0.0.1:27017/backend");
const db = mongoose.connection;
db.on("open", () => {
  console.log("Connected to DB successfully!");
});
db.on("error", () => {
  console.log("Connected to DB Unsuccessfully!");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", ProductRouter);
app.use("/cart", userAuth, cartRouter);
app.use("/user", userRouter);

app.listen(5100, () => {
  console.log("server is listing on port 5100");
});
