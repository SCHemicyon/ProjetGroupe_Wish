import { createBasketRequest, emptyBasketRequest, getBasketbyIDRequest, getBasketsbyUserIDRequest, getBasketsRequest, updateBasketRequest } from "../models/repository/basketRepository.js";
import { modifyProductRequest } from "../models/repository/productRepository.js";

export async function getBaskets(req, res) {
    try {
        const baskets = await getBasketsRequest();
        res.json(baskets);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function getBasketbyID(req, res) {
    const { id } = req.params;
    try {
        const basket = await getBasketbyIDRequest(id);
        res.json(basket);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function getBasketsbyUserID(req, res) {
    const { userID } = req.params;
    try {
        const basketsbyUserID = await getBasketsbyUserIDRequest(userID);
        res.json(basketsbyUserID);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function createBasket(req, res) {
    const basketData = req.body;
    try {
        await createBasketRequest(basketData)
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function addProductInBasket(req, res) {
    const { id } = req.params;
    let newStock;
    let newTotal;
    try {
        const basket = await getBasketbyIDRequest(id);
        const basketContent = basket.content;
        basketContent.push(req.body._id);
        newStock = req.body.stock - 1;
        newTotal = basket.total + req.body.price;
        await updateBasketRequest(id, basketContent, newTotal);
        await modifyProductRequest(req.body._id, {stock: newStock});
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function removeProductFromBasket(req, res) {
    const { id } = req.params;
    let index = -1;
    let newStock;
    let newTotal;
    try {
        const basket = await getBasketbyIDRequest(id);
        const basketContent = basket.content;
        index = basketContent.findIndex((product) => product._id == req.body._id)
        if (index >= 0) {
            newStock = req.body.stock + 1;
            newTotal = basket.total - req.body.price;
            basketContent.splice(index, 1);
        }
        await updateBasketRequest(id, basketContent, newTotal);
        await modifyProductRequest(req.body._id, {stock: newStock});
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function emptyBasket(req, res) {
    const { id } = req.params;
    try {
        await emptyBasketRequest(id);
        res.json({ ok: true });
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}