const basketList = document.querySelector("#basketList");

async function getBasketContent() {
    let basketId = "698345deb336a2133bc19ba8"
    const response = await fetch(`http://localhost:3000/baskets/id/${basketId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    const basketContent = await response.json(); 
    return basketContent.content;
}

async function displayBasket() {
    const basketContent = await getBasketContent();
    basketList.replaceChildren();
    let article;
    let name;
    let price;
    let remove;
    basketContent.forEach(product => {
        article = document.createElement("article");
        name = document.createElement("h2");
        name.textContent = product.name;
        price = document.createElement("p");
        price.textContent = product.price;
        remove = document.createElement("button");
        remove.textContent = "Supprimer du panier";
        remove.addEventListener("click", (e) => {
            e.preventDefault();
            removeProductFromBasket();
        })
        article.appendChild(name);
        article.appendChild(price);
        article.appendChild(remove);
        basketList.appendChild(article);
    });
}

displayBasket()

async function removeProductFromBasket() {

}