import mongoose from "mongoose";

const basketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    content: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        }
    ],
    total: {
        type: Number
    }
})

export const Basket = mongoose.model("baskets", basketSchema)