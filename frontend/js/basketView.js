const basketList = document.querySelector("#basketList");
const empty = document.querySelector("#empty");
const checkout = document.querySelector("#checkout");
const keepbuying = document.querySelector("#keepbuying");

async function getBasket() {
    try {
        let basketId = sessionStorage.getItem("basket_id");
        const response = await fetch(`http://localhost:3000/baskets/id/${basketId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        });
        const basket = await response.json();
        return basket;
    } catch (error) {
        console.error(error);
    }
}

async function displayBasket() {
    const basket = await getBasket();
    const basketContent = basket.content;
    basketList.replaceChildren();
    let total = document.createElement("h2");
    if (basket.total) {
        total.textContent = `Total du panier : ${basket.total} €`;
    }
    basketList.appendChild(total);
    let article;
    let name;
    let price;
    let remove;
    basketContent.forEach(product => {
        article = document.createElement("article");
        name = document.createElement("h3");
        name.textContent = product.name;
        price = document.createElement("p");
        price.textContent = `Prix : ${product.price} €`;
        remove = document.createElement("button");
        remove.setAttribute("class", "remove");
        remove.textContent = "X";
        remove.addEventListener("click", async (e) => {
            e.preventDefault();
            await removeProductFromBasket(product._id, product.stock, product.price);
            displayBasket();
        })
        article.appendChild(name);
        article.appendChild(price);
        article.appendChild(remove);
        basketList.appendChild(article);
    });
}

async function removeProductFromBasket(_id, stock, price) {
    try {
        let basketId = sessionStorage.getItem("basket_id");
        const response = await fetch(`http://localhost:3000/baskets/id/${basketId}/remove`, {
            method: "PATCH",
            body: JSON.stringify({ _id, stock, price }),
            headers: {
                "Content-type": "application/json"
            }
        });
        return;
    } catch (error) {
        console.error(error);
    }
}

checkout.addEventListener("click", async (e) => {
    e.preventDefault();
    const basket = await getBasket();
    window.location = `http://127.0.0.1:5500/frontend/checkoutView.html?total=${basket.total}`;
})

empty.addEventListener("click", async (e) => {
    if (sessionStorage.getItem("basket_id")) {
        try {
            const basket = await getBasket();
            const basketContent = basket.content;
            basketContent.forEach(async (product) => {
                let newStock = product.stock + 1;
                let _id = product._id;
                const response = await fetch(`http://localhost:3000/products/modify/${_id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ stock: newStock }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
            });
            let basketId = sessionStorage.getItem("basket_id");
            const response = await fetch(`http://localhost:3000/baskets/id/${basketId}/empty`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }
            });
            sessionStorage.removeItem("basket_id");
        } catch (error) {
            console.error(error);
        }
    }
    displayBasket();
})

keepbuying.addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "http://127.0.0.1:5500/frontend/userProductView.html";
})

displayBasket()