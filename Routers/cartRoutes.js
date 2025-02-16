import { Router } from "express";
import {
  addProductToCart,
  removeProductFromCart,
  updateQuantity,
} from "../Controllers/cartControllers.js";

const cartRouter = Router();

cartRouter.post("/", addProductToCart);
cartRouter.put("/:id", updateQuantity);
cartRouter.delete("/:id", removeProductFromCart);

export default cartRouter;
