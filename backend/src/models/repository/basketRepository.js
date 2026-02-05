import {Basket} from "../entity/basket.js";

export async function getBasketsRequest() {
    return await Basket.find().populate('content');
}

export async function getBasketbyIDRequest(id) {
    return await Basket.findOne({_id : id}).populate('content');
}

export async function getBasketsbyUserIDRequest(userID) {
    return await Basket.find({user : userID}).populate('content');
}

export async function createBasketRequest(params) {
    const basket = new Basket(params);
    return await basket.save();
}

export async function updateBasketRequest(id, content, total){
    return await Basket.updateOne({_id : id}, { content : content, total : total });
}

export async function emptyBasketRequest(id) {
    return await Basket.deleteOne({_id : id});
}