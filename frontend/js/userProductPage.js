const productList = document.getElementById("product-list");
let panier = [];

// 1. Afficher les produits 
async function displayProducts() {
    try {
        const response = await fetch("http://localhost:3000/products/available");
        const products = await response.json();
        productList.innerHTML = "";

        products.forEach(product => {
            productList.innerHTML += `
                <div class="product-card" style="border: 1px solid #ddd; border-radius: 8px; padding: 15px; text-align: center; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                    <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px;">
                    <h3 style="margin: 10px 0;">${product.name}</h3>
                    <p style="color: #666;">${product.category}</p>
                    <p style="font-size: 1.2em; font-weight: bold;">${product.price} €</p>
                    <p id="stock-${product._id}">Stock : ${product.stock}</p>
                    <button onclick="commander('${product._id}', '${product.name}', ${product.price}, ${product.stock})" 
                            style="background-color: #28a745; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
                        Ajouter au panier
                    </button>
                </div>`;
        });
    } catch (error) { console.error("Erreur affichage :", error); }
}

// 2. Ajouter au panier (Baisse le stock en base de données)
window.commander = async function(id, name, price, currentStock) {
    if (currentStock <= 0) return alert("Rupture de stock !");
    try {
        const response = await fetch(`http://localhost:3000/products/modify/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: currentStock - 1 })
        });
        const result = await response.json();
        if (result.ok) {
            panier.push({ id, name, price });
            updateCartUI();
            displayProducts(); // Met à jour l'affichage du stock
        }
    } catch (error) { console.error("Erreur commande :", error); }
};

// 3. Supprimer du panier (VISUEL UNIQUEMENT)
//  ajouter la logique de remise en stock plus tard
window.supprimerDuPanier = function(index) {
    panier.splice(index, 1); // On retire juste du tableau local
    updateCartUI(); // On rafraîchit la petite fenêtre
};

// 4. Interface du Panier
function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const list = document.getElementById("cart-items-list");
    const totalEl = document.getElementById("cart-total");

    if (cartCount) cartCount.innerText = panier.length;
    if (list) {
        if (panier.length === 0) {
            list.innerHTML = "<p style='text-align:center;'>Le panier est vide.</p>";
        } else {
            list.innerHTML = panier.map((item, index) => `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <span>${item.name} - ${item.price} €</span>
                    <button onclick="supprimerDuPanier(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:20px;">&times;</button>
                </div>`).join("");
        }
    }
    if (totalEl) {
        totalEl.innerText = `Total : ${panier.reduce((sum, item) => sum + item.price, 0)} €`;
    }
}

window.toggleModal = function() {
    const modal = document.getElementById("cart-modal");
    if (modal) modal.style.display = (modal.style.display === "none" || modal.style.display === "") ? "block" : "none";
};

window.validerAchat = function() {
    if (panier.length === 0) return alert("Panier vide !");
    alert("Merci pour votre achat !");
    panier = [];
    updateCartUI();
    toggleModal();
};

displayProducts();

