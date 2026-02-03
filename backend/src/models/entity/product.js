import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Le nom est obligatoire"]
    },
    price: {
        type: Number,
        required: [true, "Le prix est obligatoire"]
    },
    stock: {
        type: Number,
        required: [true, "Le stock est obligatoire"]
    },
    category: {
        type: String,
        enum : ["Autre", "Informatique", "Nourriture", "Vetements", "Outils", "Santé", "Jeux"],
        default : "Autre"
        
    }
})

export const Product = mongoose.model("products", productSchema)