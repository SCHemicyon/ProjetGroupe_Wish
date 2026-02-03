import {Product} from "../entity/product.js";

export async function getProductsRequest() {
    return await Product.find();
}

export async function getProductbyIDRequest(id) {
    return await Product.find({_id : id});
}

export async function getProductsbyCategoryRequest(category) {
    return await Product.find({"category" : category});
}

export async function addProductRequest(name, price, stock, category) {
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    price = price.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    stock = stock.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    category = category.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const product = new Product({name, price, stock, category});
    return await product.save();
}

export async function modifyProductRequest(id, object){
    return await Product.updateOne({_id : id}, object);
}

export async function deleteProductRequest(id) {
    return await Product.deleteOne({_id : id});
}