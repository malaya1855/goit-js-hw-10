
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
const loaderMark = document.querySelector('.loader') 
let breedId = '';

errorMessage.classList.add('visually-hidden')

fetchBreeds()
.then((cats) => {
    loaderMark.classList.add('visually-hidden')
    selectBreeds.classList.remove('visually-hidden')
    renderBreeds(cats)})
.catch(error => {
    selectBreeds.classList.add('visually-hidden')
    loaderMark.classList.remove('visually-hidden')
    Notify.failure(errorMessage.textContent)})

function fetchBreeds() {
    selectBreeds.classList.add('visually-hidden')
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
        
        // new SlimSelect({
        //     select: selectBreeds,
            
        // })
    }
    
    selectBreeds.addEventListener("change", onCreateCatCard);

    function onCreateCatCard (e){
e.preventDefault();

fetchCatByBreed()
    .then(catCards => {
        loaderMark.classList.add('visually-hidden')
        catCard.classList.remove('visually-hidden'),
        renderCatInfo(catCards)})
    .catch(error => {
        catCard.classList.add('visually-hidden')
    loaderMark.classList.remove('visually-hidden')
        Notify.failure(errorMessage.textContent)})
    
    function fetchCatByBreed(breedId){
        breedId = e.currentTarget.value;
        catCard.classList.add('visually-hidden')
        loaderMark.classList.remove('visually-hidden')
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
