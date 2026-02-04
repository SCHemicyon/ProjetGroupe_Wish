import express from "express";
import { createBasketRequest, deleteBasketRequest, getBasketbyIDRequest, getBasketsbyUserIDRequest, getBasketsRequest, modifyBasketRequest } from "../models/repository/basketRepository.js";

export const basketRouter = express.Router();

basketRouter.get("/baskets", getBasketsRequest);
basketRouter.get("/baskets/id/:id", getBasketbyIDRequest);
basketRouter.get("/baskets/user/:category", getBasketsbyUserIDRequest);

basketRouter.post("/baskets", createBasketRequest);
basketRouter.patch("/baskets/modify/:id", modifyBasketRequest);
basketRouter.delete("/baskets/delete/:id", deleteBasketRequest);
