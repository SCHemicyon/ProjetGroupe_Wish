import {Basket} from "../entity/basket.js";

export async function getBasketsRequest() {
    return await Basket.find();
}

export async function getBasketbyIDRequest(id) {
    return await Basket.find({_id : id});
}

export async function getBasketsbyUserIDRequest(userID) {
    return await Basket.find({"user" : userID});
}

export async function createBasketRequest(params) {
    const basket = new Basket(params);
    return await basket.save();
}

export async function updateBasketRequest(id, content){
    return await Basket.updateOne({_id : id}, { content : content });
}

export async function emptyBasketRequest(id) {
    return await Basket.deleteOne({_id : id});
}