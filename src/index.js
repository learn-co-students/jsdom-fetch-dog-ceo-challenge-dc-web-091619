console.log('%c HI', 'color: firebrick')

document.addEventListener("DOMContentLoaded", ()=> {

fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(resp => resp.json())
    .then(json => fetchImages(json))

fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => fetchBreeds(json))

    dropdown = document.querySelector("#breed-dropdown")
    dropdown.addEventListener("change", filterDogs)

})

const fetchImages = json => {
    i = 0;
    json.message.forEach(item => {
        let currentImage = document.createElement("img")
        currentImage.id = i;
        i++
        currentImage.src = item;
        let container = document.querySelector("#dog-image-container")
        container.append(currentImage);
        let br = document.createElement("br")
        container.append(br)
        }
    )
}

const fetchBreeds = json => {
   arr = Object.keys(json.message);
   let dropdownOption = document.querySelector("#breed-dropdown")
   if (dropdownOption.value === "1") {
   createItem(arr)
    } else {
    createItemFiltered(arr,dropdownOption) 
    }
}

function changeColor(e) {
    e.target.classList.add("colorChanged")
}

let bold = false;

function makeBold(e) {
    bold = !bold
    if (bold) {
        e.target.classList.add("bolded")
    } else {
        e.target.classList.remove("bolded")
    }
}

function filterDogs(e) {
    breedList = document.querySelector("#dog-breeds")
    breedList.innerHTML = ""
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(json => fetchBreeds(json))
    
}


function createItem(arr) {
    arr.forEach(item => {
        let currentLi = document.createElement("li");
        currentLi.innerText = item;
        currentLi.classList.add("dogBreedClass")
        appendBreed = document.querySelector('#dog-breeds')
        appendBreed.append(currentLi);
        currentLi.addEventListener("click",changeColor)
        currentLi.addEventListener("mouseover",makeBold)
        currentLi.addEventListener("mouseout",makeBold) 
    })
}

function createItemFiltered(arr,dropdownOption) {

    arr.forEach(item => {
        if (dropdownOption.value === item[0]){
        let currentLi = document.createElement("li");
        currentLi.innerText = item;
        currentLi.classList.add("dogBreedClass")
        appendBreed = document.querySelector('#dog-breeds')
        appendBreed.append(currentLi);
        currentLi.addEventListener("click",changeColor)
        currentLi.addEventListener("mouseover",makeBold)
        currentLi.addEventListener("mouseout",makeBold) 
        }
    })
}