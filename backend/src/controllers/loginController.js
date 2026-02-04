import User from '../models/user.js';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, phone, address, zipCode, city } = req.body;
        const user = new User({ firstname, lastname, email, password, phone, address, zipCode, city });
        await user.save();
        res.status(201).json({ message: "Utilisateur créé !" });
    } catch (err) {
        
        console.log("DÉTAIL DE L'ERREUR :", err); 
        
        res.status(400).json({ error: "Erreur lors de l'inscription", details: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ 
                userId: user._id, 
                firstname: user.firstname, 
                lastname: user.lastname, 
                isAdmin: user.isAdmin 
            });
        } else {
            res.status(401).json({ error: "Identifiants incorrects" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};