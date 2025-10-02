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

  const nameVolunteers = document.createElement("h3");
  nameVolunteers.textContent = `${element.firstname} ${element.lastname}`;

  const cityVolunteers = document.createElement("p");
  cityVolunteers.textContent = element.city;

  const pointVolunteers = document.createElement("p");
  pointVolunteers.textContent = ` ${element.point} points `;

  const creationDateVolunteers = document.createElement("p");
  creationDateVolunteers.textContent = element.created_at;

  const deleteVolunteers = document.createElement('button')
  deleteVolunteers.textContent = "Supprimer le pauvre" 
  deleteVolunteers.classList.add("deleteButton")

  deleteVolunteers.addEventListener("click",async () => {
    fetchDelete(element)
  })

  volunteers.append(
    nameVolunteers,
    cityVolunteers,
    pointVolunteers,
    creationDateVolunteers,
    deleteVolunteers
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