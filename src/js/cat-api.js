export default class NewApiService {
    constructor () {
         this.BASE_URL = "https://api.thecatapi.com"
         this.options = {
            headers: {
            "x-api-key": "live_4ebVElgqYTCESdDh4RFJDglzgslxsUSiTF80DOwUuLu9mvV9OJec6LfoFoweFznb",
        }}
        this.breedId = '';

    }
fetchBreeds() {
        return fetch(`${this.BASE_URL}/v1/breeds`, this.options)
        .then(response => response.json())
    }

fetchCatByBreed(breedId){
        return fetch (`${this.BASE_URL}/v1/images/search?breed_ids=${this.breedId}`, this.options)
        .then(response => response.json())
    }
    get breed (){
        return this.breedId;
    }
    set breed (newBreedId){
        this.breedId = newBreedId
    }

}
