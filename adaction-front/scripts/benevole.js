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
        showProfil(data)
  }
  profilVolunteer();


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


console.log(megots, lieu, benevole_id, gobelets, canettes, filets, preservatifs, sacs)

fetchForm(megots, lieu, benevole_id, gobelets, canettes, filets, preservatifs, sacs)

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










//  async function fetchForm(){

//    try {
//       const response = await fetch("http://localhost:3000/collectes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           city: location,
//           benevole_id: benevole_id,
//           name: ,
//           quantity: quantity
//         })
//       });
//       if (!response.ok) {
//         throw new Error("Erreur lors de l'envoi des données");
//       }
//       const result = await response.json();
//       console.log("Collecte ajoutée avec succès :", result);
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   }


 


 // Initialisation de la date du jour
// const dateInput = document.getElementById("date");
// const today = new Date().toISOString().split("T")[0];
// dateInput.value = today;
// dateInput.min = today;
// dateInput.max = today;

// const validateButton = document.getElementById("validate-button");
// const trashList = document.getElementById("trash-list");
// const totalQuantityDiv = document.getElementById("total-quantity");

// validateButton.addEventListener("click", async () => {
//   trashList.innerHTML = "";
//   let total = 0;

//   const date = dateInput.value;
//   const location = document.getElementById("location").value;
//   const selectedTrash = document.querySelectorAll('input[name="trash-type"]:checked');

//   if (!date || !location || selectedTrash.length === 0) {
//     alert("Veuillez remplir tous les champs correctement.");
//     return;
//   }

//   const trashItems = [];
//   selectedTrash.forEach(trash => {
//     const trashName = trash.value;
//     const quantityInput = document.getElementById(`quantity-${trashName}`);
//     const quantity = parseInt(quantityInput.value, 10) || 0;

//     if (quantity <= 0) {
//       alert("Veuillez entrer une quantité valide pour tous les déchets cochés.");
//       return;
//     }

//     // Ajouter à la liste affichée
//     const li = document.createElement("li");
//     li.textContent = `${trashName}: - ${quantity}`;
//     li.dataset.name = trashName;
//     li.dataset.quantity = quantity;
//     trashList.appendChild(li);

//     total += quantity;
//     trashItems.push({ name: trashName, quantity });
//   });

//   totalQuantityDiv.textContent = `Quantité totale: ${total}`;

//   // Réinitialiser les cases cochées et champs quantité
//   selectedTrash.forEach(trash => trash.checked = false);
//   selectedTrash.forEach(trash => {
//     const quantityInput = document.getElementById(`quantity-${trash.value}`);
//     quantityInput.value = "";
//   });

  // const benevole_id = id; 
  // for (const item of trashItems) {
  //   try {
  //     const response = await fetch("http://localhost:3000/collectes", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         city: location,
  //         date: date,
  //         benevole_id: benevole_id,
  //         name: item.name,
  //         quantity: item.quantity
  //       })
  //     });
  //     if (!response.ok) {
  //       throw new Error("Erreur lors de l'envoi des données");
  //     }
  //     const result = await response.json();
  //     console.log("Collecte ajoutée avec succès :", result);
  //   } catch (error) {
  //     console.error("Erreur:", error);
  //   }
  // }

            





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
      const li = document.createElement("li");
      const id = item.id ?? item.collecte_id ?? "—";
      const city = item.city ?? "—";
      const megots = item.megots ?? 0;             
      const goblets = item.goblets ?? 0;
      const canettes = item.canettes ?? 0;
      const filets = item.filets ?? 0;
      const preservatifs = item.preservatifs ?? 0;
      const sacs = item.sacs ?? 0;
  
      li.textContent =
        `#${id} • ${city} • mégots:${megots} • gobelets:${goblets} • canettes:${canettes} • filets:${filets} • préservatifs:${preservatifs} • sacs:${sacs}`;
      list.appendChild(li);
    });
  
  };


  collectesId(id)