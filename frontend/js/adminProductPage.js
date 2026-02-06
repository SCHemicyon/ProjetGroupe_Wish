const producListContainer = document.querySelector(".productList")
const formulaire = document.querySelector(".form-addProduct");

display();

formulaire.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    await createProduct(data.get("name"), data.get("price"), data.get("stock"), data.get("category"))

    producListContainer.innerHTML = "";
    display();

    formulaire.reset();
})

async function createProduct(name, price, stock, category) {
    const response = await fetch("http://localhost:3000/products", {
        method: "POST", // POST, PUT, PATCH, DELETE
        body: JSON.stringify({ name, price, stock, category }),
        headers: {
            'Content-type': "application/json"
        }
    });
    return response;
}

// affichage
async function display() {
    const data = await getProducts();


    data.forEach((product) => {
        let item = document.createElement("div")
        item.id = product._id;

        let itemTitle = document.createElement("h3")
        itemTitle.textContent = product.name

        let itemCategory = document.createElement("p")
        itemCategory.textContent = product.category

        let itemPrice = document.createElement("p")
        itemPrice.textContent = "Prix : " + product.price + " €"

        let itemStock = document.createElement("p")
        itemStock.textContent = "En Reserve : " + product.stock

        let btnContainer = document.createElement("div")

        let btnModify = document.createElement("button")
        btnModify.id = `modify-${product._id}`;
        btnModify.textContent = "Modifier"

        let btnDelete = document.createElement("button")
        btnDelete.id = `delete-${product._id}`;
        btnDelete.textContent = "Supprimer"

        btnContainer.appendChild(btnModify)
        btnContainer.appendChild(btnDelete)

        item.appendChild(itemTitle);
        item.appendChild(itemCategory);
        item.appendChild(itemPrice);
        item.appendChild(itemStock);
        item.appendChild(btnContainer);

        producListContainer.appendChild(item);

        // event delete
        btnDelete.addEventListener("click", async (event) => {
            event.preventDefault();

            await deleteProduct(item.id)
            window.location.reload();

        })

        // Event modifier
        btnModify.addEventListener("click", async (event) => {
            event.preventDefault();

            const inputName = document.createElement("input");
            inputName.type = "text";
            inputName.value = itemTitle.textContent;

            const inputPrice = document.createElement("input");
            inputPrice.type = "number";
            inputPrice.value = product.price;

            const inputStock = document.createElement("input");
            inputStock.type = "number";
            inputStock.value = product.stock;

            const selectCategory = document.createElement("select");
            ["Autre", "Informatique", "Jeux", "Nourriture", "Outils", "Santé", "Vetements"].forEach(cat => {
                const option = document.createElement("option");
                option.value = cat;
                option.textContent = cat;
                if (cat === itemCategory.textContent) option.selected = true;
                selectCategory.appendChild(option);
            });

            // Bouton Valider
            const btnValidate = document.createElement("button");
            btnValidate.textContent = "Valider";

            // Remplacement dans le DOM
            item.replaceChild(inputName, itemTitle);
            item.replaceChild(inputPrice, itemPrice);
            item.replaceChild(inputStock, itemStock);
            item.replaceChild(selectCategory, itemCategory);
            btnContainer.replaceChild(btnValidate, btnModify);

            // --- EVENT : Valider ---
            btnValidate.addEventListener("click", async (event) => {
                event.preventDefault();
                const updatedData = {
                    name: escapeHtml(inputName.value),
                    price: Number(escapeHtml(inputPrice.value)),
                    stock: Number(escapeHtml(inputStock.value)),
                    category: escapeHtml(selectCategory.value)
                };

                // modification bdd
                await modifyProduct(product._id, updatedData);
                
                // reload la page
                window.location.reload();
            });
        });

    
});
}


async function getProducts() {
    const response = await fetch("http://localhost:3000/products", {
        method: "GET", // POST, PUT, PATCH, DELETE
        headers: {
            'Content-type': "application/json"
        }
    });
    const data = await response.json();
    return data;
}

async function deleteProduct(id) {
    const response = await fetch(`http://localhost:3000/products/delete/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': "application/json"
        }
    });

    return response.json();
}

async function modifyProduct(id, updatedData) {
    const response = await fetch(`http://localhost:3000/products/modify/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

// securité js = htmlspecialchar php
function escapeHtml(text) {
  return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}
//  GESTION DE L'HISTORIQUE DES COMMANDES (KEVIN) 


document.addEventListener("DOMContentLoaded", () => {
    afficherCommandesAdmin();
});

async function afficherCommandesAdmin() {
    const commandes = await recupererCommandes();
    const conteneurCommandes = document.getElementById("container-orders");

    if (!conteneurCommandes) return;

    conteneurCommandes.innerHTML = ""; 

    if (commandes.length === 0) {
        let messageVide = document.createElement("p");
        messageVide.textContent = "Aucune commande dans l'historique.";
        conteneurCommandes.appendChild(messageVide);
        return;
    }

    commandes.forEach((cmd) => {
        let blocCommande = document.createElement("div");
        
        let titreCommande = document.createElement("h4");
        titreCommande.textContent = "Commande n° " + cmd._id;

        let infoClient = document.createElement("p");
        
        infoClient.textContent = "ID Client : " + (cmd.user || "Anonyme");

        let montantTotal = document.createElement("p");
        
        montantTotal.textContent = "Montant total : " + (cmd.total || 0) + " €";

        let nbrProduits = document.createElement("p");
       
        nbrProduits.textContent = "Nombre d'articles : " + (cmd.content ? cmd.content.length : 0);

        let separateur = document.createElement("hr");

        blocCommande.appendChild(titreCommande);
        blocCommande.appendChild(infoClient);
        blocCommande.appendChild(montantTotal);
        blocCommande.appendChild(nbrProduits);
        blocCommande.appendChild(separateur);

        conteneurCommandes.appendChild(blocCommande);
    });
}

async function recupererCommandes() {
    try {
        const response = await fetch("http://localhost:3000/api/basket", {
            method: "GET",
            headers: {
                'Content-type': "application/json"
            }
        });
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération :", error);
        return [];
    }
}