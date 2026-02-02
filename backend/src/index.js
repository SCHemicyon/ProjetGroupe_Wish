/* ANCIENNE VERSION: const express = require("express"); */

// Importations
import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";

// Connextion et configuration base de donnée mongodb
mongoose.connect(process.env.DATABASE_URL)
mongoose.set("strictQuery", true)

// On créer notre serveur express
const app = express()
app.use(express.json()) // <- Middleware qui dit en gros "utilise le format json"

// Ecoute sur le port dans le .env
app.listen(process.env.PORT, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Serveur demarrer !")

    }
});