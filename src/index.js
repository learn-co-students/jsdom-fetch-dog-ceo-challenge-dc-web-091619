console.log('%c HI', 'color: firebrick')
document.addEventListener("DOMContentLoaded", function(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then (json => {
            json.message.forEach((animal)=>{
                renderAnimal(animal)
            })

    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then (json => {

           for(const breed in json.message) {
               renderBreed(breed)
           }
        })
        })
    const dropdown = document.querySelector('#breed-dropdown')
    const selectValue = document.querySelector('#breed-dropdown').value
    dropdown.addEventListener('change', filterBreed)
})

function renderAnimal (animal){
    let dogContainer = document.querySelector('#dog-image-container')
    let animalImg = document.createElement('img')
    dogContainer.appendChild(animalImg)
    animalImg.src = animal
}

function renderBreed(breed) {
    let dogBreed = document.querySelector('#dog-breeds')
    let breedItem = document.createElement("li")
    breedItem.innerText = breed
    dogBreed.appendChild(breedItem)
    breedItem.addEventListener('click', handleClickEvent)

}

function handleClickEvent(event) {
    event.target.style.color = "red"
}

function filterBreed(event) {
   document.querySelector('#dog-breeds').innerHTML = ""
    let targetValue = event.target.value
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(json => {
            for(const breed in json.message){

                if(targetValue === breed[0]){
                    renderBreed(breed)
                }
            }
        })

}