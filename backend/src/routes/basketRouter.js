import express from "express";
import { addProductInBasket, createBasket, emptyBasket, getBasketbyID, getBaskets, getBasketsbyUserID, removeProductFromBasket } from "../controllers/basketController.js";


export const basketRouter = express.Router();

basketRouter.get("/baskets", getBaskets);
basketRouter.get("/baskets/id/:id", getBasketbyID);
basketRouter.get("/baskets/user/:userID", getBasketsbyUserID);

basketRouter.post("/baskets", createBasket);
basketRouter.patch("/baskets/id/:id/add", addProductInBasket);
basketRouter.patch("/baskets/id/:id/remove", removeProductFromBasket);

basketRouter.delete("/baskets/id/:id/empty", emptyBasket);
