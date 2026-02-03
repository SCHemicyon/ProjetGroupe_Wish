import express from "express";
import { addProduct, deleteProduct, getProductbyID, getProducts, getProductsbyCategory, modifyProduct } from "../controllers/productController.js";


const productRouter = express.Router();

productRouter.get("/products", getProducts);
productRouter.get("/products/id/:id", getProductbyID);
productRouter.get("/products/category/:category", getProductsbyCategory);

productRouter.post("/products", addProduct);
productRouter.patch("/products/modify/:id", modifyProduct);
productRouter.delete("/products/delete/:id", deleteProduct);

export default productRouter;