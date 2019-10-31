console.log('%c HI', 'color: firebrick')

const dogsUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// to get the filter functionality working, I'm mimicking state by setting two global variables
// one - to store all breeds (which I set with my initial fetch call to the breeds url)
// two - to catch track of whehter or not I am currently filtering

let filter = false
let breedsData

document.addEventListener('DOMContentLoaded', () => {
    fetchDogImages()
    fetchDogBreeds()
    getDropDown().addEventListener('change', filterBreeds)
})

function fetchDogImages() {
    fetch(dogsUrl)
    .then(resp => resp.json())
    .then(dogData => dogData.message.forEach( image => displayImage(image)))
}

function fetchDogBreeds() {
    fetch(breedUrl)
    .then(resp => resp.json())
    .then(breedData => {
        breedsData = breedData
        displayBreeds()
    })
}

function displayImage(image) {
    const imageItem = document.createElement('img')
    imageItem.src = image
    getDogImageContainer().append(imageItem)
}

function displayBreeds() {
    breedKeys = Object.keys(breedsData.message)
    let breeds
    if (filter === true) {
        if (getFilterLetter() === '--all--') {
            breeds = breedKeys
            filter = false
        } else {
            getDogBreedsList().innerHTML = ''
        breeds = breedKeys.filter(breed => breed.startsWith(getFilterLetter()))
        filter = false
        }   
    } else {
        breeds = breedKeys
    }
    for (const breed of breeds) {
        const breedLi = document.createElement('li')
        breedLi.addEventListener('click', changeLiColor)
        breedLi.innerText = breed
        getDogBreedsList().append(breedLi)
        if (breedsData.message[`${breed}`].length > 0) {
            const subBreedList = document.createElement('ul')
            breedsData.message[`${breed}`].forEach( subBreed => {
                subBreedLi = document.createElement('li')
                subBreedLi.innerText = subBreed
                subBreedList.append(subBreedLi)
            })
            breedLi.append(subBreedList)
        }
    }
}

function filterBreeds() {
    filter = true
    displayBreeds()
}

function changeLiColor(event) {
    console.log('changing the color...')
    const li = event.target
    li.style.color = 'purple'
}

function filterBreeds(event) {
    filter = true
    displayBreeds()
}

// functions to grab DOM nodes
function getDogImageContainer() {
    return document.getElementById('dog-image-container')
}

function getDogBreedsList() {
    return document.getElementById('dog-breeds')
}

function getDropDown() {
    return document.getElementById('breed-dropdown')
}

function getFilterLetter() {
    return document.getElementById('breed-dropdown').value
}