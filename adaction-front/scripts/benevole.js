let currentVolunteer = null;
const params = new URLSearchParams(location.search)
const id = params.get("id")
if (!id) window.location.href = "login.html"



async function profilVolunteer() {
  const resp = await fetch(`http://localhost:3000/benevoles/${id}`);
  if (!resp.ok) {
    alert("Utilisateur introuvable");
    location.href = "login.html";
    return;
  }
  const data = await resp.json();
  currentVolunteer = data; // ✅ stocker les données globalement
  showProfil(data);
}
  profilVolunteer();

 async function totalVolunteers() {
  const resp = await fetch(`http://localhost:3000/collectes/${id}`);
  const data = await resp.json();

  let total = 0;

  data.forEach(element => {
    total +=
      Number(element.megots) +
      Number(element.gobelets) +
      Number(element.canettes) +
      Number(element.filets) +
      Number(element.preservatifs) +
      Number(element.sacs);
  });
  return total;
}

async function afficherTotal() {
  const total = await totalVolunteers(); // on attend le résultat
  const totalDiv = document.getElementById("totalDechets-span");
  totalDiv.textContent = `${total}`;
}
afficherTotal()
  const showProfil = (data) => {
    document.getElementById("firstname-span").textContent = `: ${data.firstname}`
    document.getElementById("uid").textContent = `${data.id}`
    document.getElementById("city-span").textContent=` ${data.city}`
    
  }

// 
  document.querySelector("#btn-modification").addEventListener("click", () => {
    
  })
 



//  Ajouter en bas les fetch back et les élements dynamiques des collectes

const newCollecte = document.getElementById("new-collecte");
newCollecte.addEventListener("click", () => {
  const form = document.getElementById("collecte-form");
  form.style.display = form.style.display === "none" ? "block" : "none";
  document.getElementById("collectes-container").style.display = form.style.display === "none" ? "block" : "none";
  console.log(form.style.display)

})


// document.getElementById("collecte-form").reset()
document.getElementById("collecte-form").addEventListener("submit",(e) =>{
  e.preventDefault();
const megots = document.getElementById("quantity-megots").value
const lieu = document.getElementById("location").value
const benevole_id = id  
const gobelets = document.getElementById("quantity-gobelets").value
const canettes = document.getElementById("quantity-canettes").value
const filets = document.getElementById("quantity-filets").value
const preservatifs = document.getElementById("quantity-preservatifs").value
const sacs = document.getElementById("quantity-sacs").value
const form = document.getElementById("collecte-form");
const container = document.getElementById("collectes-container");

console.log(megots, lieu, benevole_id, gobelets, canettes, filets, preservatifs, sacs)

fetchForm(megots, lieu, benevole_id, gobelets, canettes, filets, preservatifs, sacs)

form.reset();

 form.style.display = "none";
 container.style.display = "block";

console.log(megots)
 
})


 async function fetchForm(megots, lieu, benevole_id, gobelets, canettes, filets, preservatifs, sacs){

   try {
      const response = await fetch("http://localhost:3000/collectes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          benevole_id: Number(benevole_id),
          city: lieu,
          megots: Number(megots),
          gobelets: Number(gobelets),
          canettes: Number(canettes),
          filets: Number(filets),
          preservatifs: Number(preservatifs),
          sacs: Number(sacs)
        })
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }
      const result = await response.json();
      console.log("Collecte ajoutée avec succès :", result);
      

    } catch (error) {
      console.error("Erreur:", error);
    }
  }

const collectesId = async (benevole_id) => {
    const response = await fetch(`http://localhost:3000/collectes/${benevole_id}`);
    const collectes = await response.json();
  

  
    const list = document.createElement("ul");
    list.className = "collectes"; 
    document.getElementById("collectes-container").appendChild(list);
  
    if (collectes.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Aucune collecte pour ce bénévole";
      list.appendChild(li);
      return;
    }
  
    collectes.forEach(item => {
      const dateISO = "2025-10-08T06:06:07.663Z";
      const date = new Date(dateISO);
      const onlyDate = date.toLocaleDateString("fr-FR", { timeZone: "Europe/Paris" });
      // Juste la date en format français
     
      const li = document.createElement("li");
      // const date = item.date ??"—";
      const city = item.city ?? "—";
      const megots = item.megots ?? 0;             
      const goblets = item.goblets ?? 0;
      const canettes = item.canettes ?? 0;
      const filets = item.filets ?? 0;
      const preservatifs = item.preservatifs ?? 0;
      const sacs = item.sacs ?? 0;
  
      li.textContent =
        `${onlyDate} • ${city} • mégots:${megots} • gobelets:${goblets} • canettes:${canettes} • filets:${filets} • préservatifs:${preservatifs} • sacs:${sacs}`;
      list.appendChild(li);
    });
  
  };


  collectesId(id)
document.getElementById("btn-modification").addEventListener("click", () => {
  if (!currentVolunteer) return alert("Aucune donnée du profil chargée");

  const oldForm = document.getElementById("formUpdateVolunteers");
  if (oldForm) oldForm.remove();

  const form = document.createElement("form");
  form.id = "formUpdateVolunteers";

  const inputFirstname = document.createElement("input");
  inputFirstname.type = "text";
  inputFirstname.required = true;
  inputFirstname.value = currentVolunteer.firstname;
  form.appendChild(inputFirstname);

  const inputLastname = document.createElement("input");
inputLastname.type = "text";
inputLastname.required = true;
inputLastname.value = currentVolunteer.lastname ?? ""; // <-- attention ici
form.appendChild(inputLastname);

  const inputCity = document.createElement("input");
  inputCity.type = "text";
  inputCity.required = true;
  inputCity.value = currentVolunteer.city;
  form.appendChild(inputCity);

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.required = true;
  inputPassword.value = currentVolunteer.password;
  form.appendChild(inputPassword);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Mettre à jour";
  form.appendChild(button);

  // 🔄 Listener sur le submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      id: currentVolunteer.id,
      firstname: inputFirstname.value.trim(),
      lastname: inputLastname.value.trim(),
      city: inputCity.value.trim(),
      password: inputPassword.value.trim(),
    };

    await fetchModified(updatedData);

    form.remove(); // on enlève le formulaire après la mise à jour
    profilVolunteer(); // recharge le profil mis à jour
  });

  document.querySelector("header").appendChild(form);
});
async function fetchModified(volunteer) {
  try {
    const resp = await fetch(`http://localhost:3000/benevoles/${volunteer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: volunteer.firstname,
        lastname: volunteer.lastname,
        city: volunteer.city,
        password: volunteer.password
      }),
      
    });
    console.log(resp);

    if (!resp.ok) throw new Error(resp.statusText);

    const data = await resp.json();
    console.log("✅ Bénévole modifié :", data);
  } catch (e) {
    console.error("❌ Erreur modification :", e);
  }
} 
