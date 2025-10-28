const form = document.querySelector("form")


form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const firstname = document.querySelector("#firstname-input").value.trim()
    const password = document.querySelector("#password-input").value

    try {    
    const resp = await fetch(`${window.API_BASE}/login`, {      
            method: "POST",      
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({
            firstname: firstname,
            password: password
        }),    
            });
            console.log('resp',resp)

        const data = await resp.json()
        console.log("data reçu du back:", data);  
 
        if (!resp.ok) {
            //  vient du back si 400/401/500
            const erreur = document.createElement("p")
            erreur.textContent = "Identifiant ou mot de passe invalide"
            erreur.classList.add("erreur")
            document.getElementById("erreur").appendChild(erreur)
            throw new Error(data.error || "Connexion impossible");
          }

         window.location.href =`benevole.html?id=${encodeURIComponent(data.userId)}`
         } 
        catch (e) 
        {     
        console.log('Error :', e);  }
})

// 