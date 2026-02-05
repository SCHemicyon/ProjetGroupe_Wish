const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener("submit", async (event) =>{
    event.preventDefault();
    const data = new FormData(event.target);
    const email = data.get("email");
    const password = data.get("password");
 
    
    const response = await fetch ("http://localhost:3000/connexion", {
        method:"POST",
        body: JSON.stringify({email, password}),
        headers:{
            'Content-type' : "application/json"
        }
    });
    const resJson = await response.json()
    
    sessionStorage.setItem("id", resJson.id);
    window.location = "http://127.0.0.1:5500/frontend/userProductView.html"
    return response
    
})

