/* ANCIENNE VERSION: const express = require("express"); */

// Importations
import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from './routes/productRouter.js';

// Connextion et configuration base de donnée mongodb
mongoose.connect(process.env.DATABASE_URL)
mongoose.set("strictQuery", true)

// On créer notre serveur express
const app = express()
app.use(express.json())
app.use(cors()) 
app.use(productRouter)

// Ecoute sur le port dans le .env
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Serveur demarrer !")

    }
});