const divContainer = document.getElementById("divContainer");
const formCreateVolunteers = document.getElementById("formCreateVolunteers")


async function showVolunteers() {
  try {
    const response = await fetch("http://localhost:3000/benevoles");
    const data = await response.json();

    data.forEach((element) => {
      dynamic(element);
    });
  } catch (error) {}
}

showVolunteers();

async function searchVolunteers() {
  divContainer.innerText = "";
  const inputName = document.getElementById("searchName").value;
  const inputCity = document.getElementById("searchCity").value;

  const response = await fetch("http://localhost:3000/benevoles");
  const data = await response.json();

  data.forEach((element) => {
    if (inputName === element.firstname || inputCity === element.city) {
      dynamic(element);
    }
  });
}


function dynamic(element) {
  const volunteers = document.createElement("div");
  divContainer.appendChild(volunteers);

  const firstnameVolunteers = document.createElement("h3");
  firstnameVolunteers.textContent = element.firstname;

  const lastnameVolunteers = document.createElement("h3");
  lastnameVolunteers.textContent = element.lastname;

  const cityVolunteers = document.createElement("p");
  cityVolunteers.textContent = element.city;

  const passwordVolunteers = document.createElement("p");
  passwordVolunteers.textContent = `le mot de passe est : ${element.password}`;

  const pointVolunteers = document.createElement("p");
  pointVolunteers.textContent = ` ${element.point} points `;

  const creationDateVolunteers = document.createElement("p");
  creationDateVolunteers.textContent = element.created_at;

  const deleteVolunteers = document.createElement("button");
  deleteVolunteers.textContent = "Supprimer";
  deleteVolunteers.classList.add("deleteButton");

  const modifiedVolunteers = document.createElement("button");
  modifiedVolunteers.textContent = "Modifier";
  modifiedVolunteers.classList.add("modifiedButton");

  // bouton supprimer
  deleteVolunteers.addEventListener("click", async () => {
    fetchDelete(element);
  });

  // bouton modifier
  modifiedVolunteers.addEventListener("click", () => {
    // Supprimer un ancien formulaire s’il existe déjà
    const oldForm = document.getElementById("formUpdateVolunteers");
    if (oldForm) oldForm.remove();

    // Créer le formulaire
    const form = document.createElement("form");
    form.id = "formUpdateVolunteers";

    // Champ prénom
    const inputFirstname = document.createElement("input");
    inputFirstname.type = "text";
    inputFirstname.required = true;
    inputFirstname.value = element.firstname;
    form.appendChild(inputFirstname);

    // Champ nom
    const inputLastname = document.createElement("input");
    inputLastname.type = "text";
    inputLastname.required = true;
    inputLastname.value = element.lastname;
    form.appendChild(inputLastname);

    // Champ ville
    const inputCity = document.createElement("input");
    inputCity.type = "text";
    inputCity.required = true;
    inputCity.value = element.city;
    form.appendChild(inputCity);

    // Champ mot de passe
    const inputPassword = document.createElement("input");
    inputPassword.type = "password";
    inputPassword.required = true;
    inputPassword.value = element.password;
    form.appendChild(inputPassword);

    // Bouton valider
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Mettre à jour";
    form.appendChild(button);

    button.addEventListener("click", async () => {
      fetchModified(element)
    });

    // Listener submit
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      await fetchModified({
        id: element.id,
        firstname: inputFirstname.value.trim(),
        lastname: inputLastname.value.trim(),
        city: inputCity.value.trim(),
        password: inputPassword.value.trim(),
      });

      form.remove();          // retirer le form après update
      divContainer.innerHTML = ""; 
      showVolunteers();       // recharger la liste
    });

    // Ajouter le form sous le bénévole
    volunteers.appendChild(form);
  });

  // Ajouter les éléments du bénévole
  volunteers.append(
    firstnameVolunteers,
    lastnameVolunteers,
    cityVolunteers,
    passwordVolunteers,
    pointVolunteers,
    creationDateVolunteers,
    deleteVolunteers,
    modifiedVolunteers
  );
}



async function fetchDelete(element){  
    try {    
        const resp = await fetch("http://localhost:3000/benevoles", {      
            method: "DELETE",      
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({
            user_id: element.id
        }),    
            });
            console.log('resp ',resp)
        if (!resp.ok) throw new Error(resp.error);

        const data = await resp.json();  

        // alert(`✅ ${data.message}`);  
        } 
        catch (e) 
        {    
        // alert("❌ Impossible d'envoyer la commande.");    
        console.log('Error :', e);  }
}

function addVolunteers() {
  formCreateVolunteers.style.display = "block"
}

async function validateVolunteers(){
    const createFirstname = document.getElementById("create-firstname").value.trim()
    const createLastname = document.getElementById("create-lastname").value.trim()
    const createCity = document.getElementById("create-city").value.trim()
    const createpassword = document.getElementById("create-password").value.trim()


    try {    
        const resp = await fetch("http://localhost:3000/benevoles", {      
            method: "POST",      
            headers: { "Content-Type": "application/json" },      
            body: JSON.stringify({
            firstname: createFirstname,
            lastname: createLastname,
            city: createCity,
            password: createpassword
        }),    
            });
            console.log('resp ',resp)
        if (!resp.ok) throw new Error(resp.error);

        const data = await resp.json();  

         } 
        catch (e) 
        {    
        // alert("❌ Impossible de créer le bénévole");    
        console.log('Error :', e);  }
   
}
// 

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

    if (!resp.ok) throw new Error(resp.statusText);

    const data = await resp.json();
    console.log("✅ Bénévole modifié :", data);
  } catch (e) {
    console.error("❌ Erreur modification :", e);
  }
}