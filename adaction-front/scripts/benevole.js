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




//   Ajouter en bas les fetch back et les élements dynamiques des collectes