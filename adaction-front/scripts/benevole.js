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
const addTrashButton = document.getElementById("add-trash-button");
const trashList = document.getElementById("trash-list");
const totalQuantityDiv = document.getElementById("total-quantity");
const submitButton = document.getElementById("submit-button");
const trashType = document.getElementById("trash-type");
const quantityInput = document.getElementById("quantity");
const otherTrashInput = document.getElementById("other-trash"); // ajouté pour éviter la ReferenceError

let totalQuantity = 0;

addTrashButton.addEventListener("click", () => {
  const type = trashType.value; // récupère le type sélectionné
  const nom = otherTrashInput.value.trim(); // récupère le nom précisé
  const quantity = quantityInput.value;

  let trashName = type;
  if (nom !== "") {
    trashName += ` (${nom})`; // concatène avec parenthèses
  }

  const trashAdd = document.createElement("li");
  trashAdd.textContent = `${trashName} ${quantityInput.value}`;
  trashList.appendChild(trashAdd);

  totalQuantity += parseInt(quantityInput.value, 10);
  totalQuantityDiv.textContent = `Quantité totale: ${totalQuantity}`;

  quantityInput.value = '';
  otherTrashInput.value = '';
});

submitButton.addEventListener("click", async () => {
  const date = document.getElementById("date").value;
  const location = document.getElementById("location").value;
  const trashes = [];
  const trashItems = document.querySelectorAll("#trash-list li");
  
  if (!date || !location || trashItems.length === 0) {
    alert("Veuillez remplir la date, le lieu et ajouter au moins un déchet.");
    return;
  }

  trashItems.forEach(li => {
    const [name, quantity] = li.textContent.split(" ");
    trashes.push({ name, quantity: parseInt(quantity, 10) });
  });

  const benevole_id = id 

  for (const li of trashItems) {
    const [name, quantity] = li.textContent.split(" ");
    try {
      const response = await fetch("http://localhost:3000/collectes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ville: location,
          date: date,
          benevole_id: benevole_id,
          name: name,
          quantity: parseInt(quantity, 10)
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }

      const result = await response.json();
      console.log("Collecte ajoutée avec succès :", result);

    } catch (error) {
      console.log("erreur", error);
    }
  }
});

//   On va devoir créer une tables trashes, parce que un bénévole qui a plusieur déchets dans 
//  le back ça le met dans plusieurs ligne et non pas 
//  dans la meme ligne sachant que c'est plusieurs collectes récup le meme jour