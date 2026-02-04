const inscription = document.querySelector("#form");

inscription.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    await createUser(data.get("lastname"), data.get("firstname"), data.get("email"), data.get("password"))
})

async function createUser(lastname, firstname, email, password){
    const response = await fetch ("http://localhost:3000/user", {
        method:"POST",
        body: JSON.stringify({lastname, firstname, email, password}),
        headers:{
            'Content-type' : "application/json"
        }
    });
    return response;
}