const productList = document.getElementById("product-list");
let panier = [];
const btndeconnexion = document.querySelector("#deconnexion");

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

//  Ajouter au panier (Baisse le stock en base de données)
window.commander = async function (id, name, price, currentStock) {
    try {
        if (!sessionStorage.getItem("basket_id")) {
            let userID = sessionStorage.getItem("id");
            let content = [];
            let total = 0
            const response = await fetch(`http://localhost:3000/baskets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userID, content, total })
            });
            newBasket = await response.json();
            sessionStorage.setItem("basket_id", newBasket._id);
        }
        if (currentStock <= 0) return alert("Rupture de stock !");
        const addProduct = await fetch(`http://localhost:3000/baskets/id/${sessionStorage.getItem("basket_id")}/add`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, price })
        });
        const response = await fetch(`http://localhost:3000/products/modify/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock: currentStock - 1 })
        });
        const result = await response.json();
        if (result.ok) {
            updateCartUI();
            displayProducts(); // Met à jour l'affichage du stock
        }
    } catch (error) { console.error("Erreur commande :", error); }
};

// Interface du Panier
async function updateCartUI() {
    const response = await fetch(`http://localhost:3000/baskets/id/${sessionStorage.getItem("basket_id")}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    const length = await response.json();
    const cartCount = document.getElementById("cart-count");

    if (cartCount) cartCount.innerText = length.content.length;
}

window.toggleModal = function () {
    window.location = "http://127.0.0.1:5500/frontend/basketView.html";
};

window.validerAchat = function () {
    if (panier.length === 0) return alert("Panier vide !");
    alert("Merci pour votre achat !");
    panier = [];
    updateCartUI();
    toggleModal();
};

displayProducts();
updateCartUI();


// deconnexion et revenir sur la partie connexion

btndeconnexion.addEventListener("click", async (event) => {
    event.preventDefault();
    sessionStorage.clear();
    window.location = "http://127.0.0.1:5500/frontend/userLogin.html"
    
})


