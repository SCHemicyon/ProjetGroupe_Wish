import { addProductRequest, deleteProductRequest, getProductbyIDRequest, getProductsbyCategoryRequest, getProductsRequest, modifyProductRequest, getAvailableProductsRequest } from "../models/repository/productRepository.js";


export async function getProducts(req, res) {
    try {
        const products = await getProductsRequest();
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function getProductbyID(req, res) {
    const { id } = req.params;
    try {
        const products = await getProductbyIDRequest(id);
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function getProductsbyCategory(req, res) {
    const { category } = req.params;
    try {
        const products = await getProductsbyCategoryRequest(category);
        res.json(products);
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function addProduct(req, res) {
    const { name, price, stock, category } = req.body;
    try {
        await addProductRequest(name, price, stock, category);
        res.json({ok : true});
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function modifyProduct(req, res) {
    const { id } = req.params;
    const object = req.body;
    try {
        await modifyProductRequest(id, object);
        res.json({ok : true});
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

export async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await deleteProductRequest(id);
        res.json({ok : true});
    }
    catch (err) {
        console.error(err);
        res.json({ ok: false });
    }
}

// Fonction pour que l'utilisateur puisse consulter les produits en stock
export async function getAvailableProducts(req, res) {
    try {
        // On appelle la fonction du repository qui fait le filtre stock > 0
        const products = await getAvailableProductsRequest();
        
        // On renvoie les produits trouvés au format JSON
        res.json(products);
    }
    catch (err) {
        // Si la base de données a un problème, on log l'erreur et on prévient le front
        console.error(err);
        res.json({ ok: false, message: "Impossible de charger les produits disponibles." });
    }
}