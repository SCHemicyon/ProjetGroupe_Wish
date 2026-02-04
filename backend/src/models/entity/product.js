import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
        
    },
    image: {
        type: String // On stockera l'URL ici
    }

});

export const Product = mongoose.model("products", productSchema)