export default function fetchBreeds() {
    const BASE_URL = "https://api.thecatapi.com"
const options = {
headers: {
"x-api-key": "live_4ebVElgqYTCESdDh4RFJDglzgslxsUSiTF80DOwUuLu9mvV9OJec6LfoFoweFznb",
}}

    return fetch(`${BASE_URL}/v1/breeds`, options)
    .then(response => response.json())
}


function renderBreeds(cats) {
    catsList = cats;
    for (let i = 0; i < cats.length; i += 1){
        const cat = cats[i];
       const breedOption = document.createElement("option")
       breedOption.value = cat.id;
       breedOption.innerHTML = `${cat.name}`;
       selectBreeds.appendChild(breedOption)
    }
}

