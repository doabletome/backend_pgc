import { Router } from "express";
import {
  fetchProducts,
  fetchSingleProduct,
} from "../Controllers/productControllers.js";

const productRouter = Router();

productRouter.get("/", fetchProducts);
productRouter.get("/:id", fetchSingleProduct);

export default productRouter;
