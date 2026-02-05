const basketList = document.querySelector("#basketList");

async function getBasket() {
    let basketId = "698345deb336a2133bc19ba8"
    const response = await fetch(`http://localhost:3000/baskets/id/${basketId}`, {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    });
    const basket = await response.json();
    return basket;
}

async function displayBasket() {
    const basket = await getBasket();
    const basketContent = basket.content;
    basketList.replaceChildren();
    let total = document.createElement("p");
    total.textContent = basket.total;
    basketList.appendChild(total);
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
            removeProductFromBasket(product._id, product.stock, product.price);
        })
        article.appendChild(name);
        article.appendChild(price);
        article.appendChild(remove);
        basketList.appendChild(article);
    });
}

async function removeProductFromBasket(_id, stock, price) {
    let basketId = "698345deb336a2133bc19ba8"
    const response = await fetch(`http://localhost:3000/baskets/id/${basketId}/remove`, {
        method: "PATCH",
        body: JSON.stringify({ _id, stock, price }),
        headers: {
            "Content-type": "application/json"
        }
    });
    displayBasket();
    return;
}

displayBasket()