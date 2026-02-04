const productList = document.getElementById("product-list");

// 1. Fonction pour afficher les produits
async function displayProducts() {
    try {
        const response = await fetch("http://localhost:3000/products/available");
        const products = await response.json();

        productList.innerHTML = "";

        products.forEach(product => {
            const productCard = `
                <div class="product-card" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">
                    <h3 style="margin: 10px 0;">${product.name}</h3>
                    <p style="color: #666;">${product.category}</p>
                    <p style="font-size: 1.2em; font-weight: bold;">${product.price} €</p>
                    <p id="stock-${product._id}">Stock : ${product.stock}</p>
                    <button onclick="commander('${product._id}')" style="background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Commander
                    </button>
                </div>
            `;
            productList.innerHTML += productCard;
        });
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
    }
}
// 2. FONCTION TEMPORAIRE : Pour éviter l'erreur en attendant le code pour commender 
window.commander = function(id) {
    //  juste un message pour montrer que le bouton réagit
    alert("Bouton cliqué ! La logique de commande sera ajoutée par mon collègue bientôt.");
};

// Lancement au chargement de la page
displayProducts();