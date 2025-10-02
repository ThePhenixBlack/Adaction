

const btnCreateVolunteer = document.querySelector("#btn-new-volunteer")
console.log(btnCreateVolunteer)
const btnConnect = document.querySelector("#btn-connect")
const form = document.querySelector("#formCreateVolunteers")


btnCreateVolunteer.addEventListener("click", (e) =>{
    e.preventDefault()

    btnCreateVolunteer.style.display="none"
    btnConnect.style.display="none"
    form.style.display="block"
})





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