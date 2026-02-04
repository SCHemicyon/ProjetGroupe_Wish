const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Vérifie bien ce chemin

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Remplace la ligne 10 (ou celle qui pose problème) par ceci :
const mongoURI = "mongodb+srv://sofia:monSuperMdp123@cluster0.abcde.mongodb.net/wish_project?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("🚀 MongoDB Connecté !"))
    .catch(err => console.log("❌ Erreur :", err));

app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log("✅ Serveur sur le port 3000"));