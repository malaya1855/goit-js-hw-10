
import { Report } from 'notiflix/build/notiflix-report-aio'
import SlimSelect from 'slim-select'
import "slim-select/dist/slimselect.css";
import NewApiService from './cat-api';


const selectBreeds = document.querySelector("select.breed-select")
const errorMessage = document.querySelector('.error')
const catCard = document.querySelector('.cat-info')
const loaderMark = document.querySelector('.loader') 

const newApiService = new NewApiService()

errorMessage.classList.add('visually-hidden')
selectBreeds.classList.add('visually-hidden')
catCard.classList.add('visually-hidden') 

newApiService.fetchBreeds()
.then((cats) => {
    loaderMark.classList.add('visually-hidden')
    selectBreeds.classList.remove('visually-hidden')
    renderBreeds(cats)
    })
.catch(error => {
    errorMessage.classList.remove('visually-hidden')
    Report.failure(
        'Oops! Something went wrong!',
        'Try reloading the page!',
        'Okay',
        );
})

function renderBreeds(cats) {
    const placeholderOption = document.createElement("option")
    placeholderOption.setAttribute('data-placeholder', true) 
    selectBreeds.append(placeholderOption)
    const breedItem = cats.map(
        cat => {
            const breedOption = document.createElement("option")
            breedOption.value = cat.id;
            breedOption.innerHTML = `${cat.name}`
            return breedOption
        })
        selectBreeds.append(...breedItem);
        
        new SlimSelect({
            select: selectBreeds,
            settings: {
                placeholderText: 'Select the breed',
              }
        })
    }
    
selectBreeds.addEventListener("change", onCreateCatCard);

function onCreateCatCard(e) {
e.preventDefault();
newApiService.breedId = e.currentTarget.value;

loaderMark.classList.remove('visually-hidden')
catCard.classList.add('visually-hidden') 

newApiService.fetchCatByBreed()
.then(catCards => {
        loaderMark.classList.add('visually-hidden')
        catCard.classList.remove('visually-hidden'),
        renderCatInfo(catCards)})
.catch(error => {
        errorMessage.classList.remove('visually-hidden')
    Report.failure(
        'Oops! Something went wrong!',
        'Try reloading the page!',
        'Okay',
        );
    })

function renderCatInfo(catCards){
        for (let i = 0; i < catCards.length; i += 1){
                const cat = catCards[0];
                catCard.innerHTML = `<img class="image" src="${cat.url}" alt="${cat.breeds[0].name} width=500">
                <div>
                <h2 class="name">${cat.breeds[0].name}</h2>
                <p class="description">${cat.breeds[0].description}</p>
                <p class="temperament"><span class="title">Temperament:</span> ${cat.breeds[0].temperament}</p>
                </div>`      
            }
            }  
    }