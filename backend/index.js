import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";

// Configuration des variables avec valeurs par défaut (fallback)
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DATABASE_URL; 

// Connexion à MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log("🚀 MongoDB connecté !"))
    .catch(err => console.error("❌ Erreur de connexion :", err));

mongoose.set("strictQuery", true);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);

// Ecoute sur le port (on utilise la variable PORT ici)
app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`✅ Serveur démarré sur le port ${PORT} !`);
    }
});