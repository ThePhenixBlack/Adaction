const divContainer = document.getElementById('divContainer')

async function showVolunteers(){
    try {
        const response = await fetch("http://localhost:3000/benevoles")
        const data = await response.json()

        data.forEach(element => {
            dynamic(element)
        });
    } catch (error) {
        
    }
}

function dynamic(element) {

    const volunteers = document.createElement("div")
    divContainer.appendChild(volunteers)

    const nameVolunteers = document.createElement("h3")
    nameVolunteers.textContent = `${element.firstname} ${element.lastname}`

     const cityVolunteers = document.createElement("p")
    cityVolunteers.textContent = element.city

     const pointVolunteers = document.createElement("p")
    pointVolunteers.textContent = ` ${element.point} points `
    const creationDateVolunteers = document.createElement("p")
    creationDateVolunteers.textContent = element.created_at

    volunteers.append(nameVolunteers,cityVolunteers,pointVolunteers,creationDateVolunteers)
}

showVolunteers()