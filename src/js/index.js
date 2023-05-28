
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select'
// import fetchBreeds from './cat-api';

const BASE_URL = "https://api.thecatapi.com"
const options = {
    headers: {
    "x-api-key": "live_4ebVElgqYTCESdDh4RFJDglzgslxsUSiTF80DOwUuLu9mvV9OJec6LfoFoweFznb",
}}

const selectBreeds = document.querySelector("select.breed-select")
const errorMessage = document.querySelector('.error')
const catCard = document.querySelector('.cat-info')
let breedId = '';



fetchBreeds()
.then((cats) => renderBreeds(cats))
.catch((error) => Notify.failure(errorMessage.textContent))

function fetchBreeds() {
    return fetch(`${BASE_URL}/v1/breeds`, options)
    .then(response => response.json())
}


function renderBreeds(cats) {
    const breedItem = cats.map(
        cat => {
            const breedOption = document.createElement("option")
        breedOption.value = cat.id;
        breedOption.innerHTML = `${cat.name}`
    return breedOption
        }
    )
    selectBreeds.append(...breedItem);
    console.log(selectBreeds);
    
    // new SlimSelect({
    //     select: selectBreeds,
    //   })
}
    
    selectBreeds.addEventListener("change", onCreateCatCard);

    function onCreateCatCard (e){
e.preventDefault();

fetchCatByBreed()
    .then(catCards => renderCatInfo(catCards))
    .catch(error => Notify.failure(errorMessage.textContent))
    
    function fetchCatByBreed(breedId){
        breedId = e.currentTarget.value;
        return fetch (`${BASE_URL}/v1/images/search?breed_ids=${breedId}`, options)
        .then(response => response.json())
    }
    function renderCatInfo(catCards){
for (let i = 0; i < catCards.length; i += 1){
        const cat = catCards[0];
        catCard.innerHTML = `<img class="image" src="${cat.url}" alt="${cat.breeds[0].name}">
        <div>
        <h2 class="name">${cat.breeds[0].name}</h2>
        <p class="description">${cat.breeds[0].description}</p>
        <p class="temperament"><span class="title">Temperament:</span> ${cat.breeds[0].temperament}</p>
        </div>`
        
    }
    }}

    
    // const ingredients = [
    //     'Potatoes',
    //     'Mushrooms',
    //     'Garlic',
    //     'Tomatos',
    //     'Herbs',
    //     'Condiments',
    //   ];
    //   const list = document.querySelector('#ingredients')
      
    //   const newIngredient = ingredients.map (
    //     ingredient => {
    //       const name = document.createElement('li');
    //     name.classList.add('item');
    //     name.textContent = ingredient;
    //     return name
    //     }
    //   )
    //   list.append(...newIngredient)