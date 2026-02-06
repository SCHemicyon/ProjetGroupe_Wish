const userId = sessionStorage.getItem("id");
const btnaccueil = document.querySelector("#accueil")

if (!userId || userId === "undefined") {
    console.error("Utilisateur non connecté");
}

async function displayOrderHistory() {
    const ordersList = document.getElementById("orders-list");
    ordersList.innerHTML = "Chargement de l'historique...";

    try {
        const response = await fetch(`http://localhost:3000/baskets/user/${userId}`);
        const baskets = await response.json();

        if (!baskets || baskets.length === 0) {
            ordersList.innerHTML = "<p>Aucune commande trouvée.</p>";
            return;
        }

        ordersList.innerHTML = baskets.map(basket => `
            <div class="order-card">
                <span class="order-id">ID Commande : ${basket._id}</span>
                <p class="order-total">Montant Total : ${basket.total} €</p>
                <p><strong>Articles achetés :</strong></p>
                <ul class="articles-list">
                    ${basket.content.map(item => `
                        <li class="article-item">
                            ${item.name} <span class="article-price">(${item.price} €)</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `).join("");

    } catch (error) {
        console.error("Erreur historique :", error);
        ordersList.innerHTML = "<p>Erreur lors de la récupération de l'historique.</p>";
    }
}

window.displayOrderHistory = displayOrderHistory;


btnaccueil.addEventListener("click", async (event) =>{
    event.preventDefault();
    window.location = "http://127.0.0.1:5500/frontend/userProductView.html"


})