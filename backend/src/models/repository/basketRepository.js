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

export async function createBasketRequest(user, content, total) {
    
    const basket = new Basket({user, content, total});
    return await basket.save();
}

export async function modifyBasketRequest(id, object){
    return await Product.updateOne({_id : id}, object);
}

export async function deleteBasketRequest(id) {
    return await Product.deleteOne({_id : id});
}