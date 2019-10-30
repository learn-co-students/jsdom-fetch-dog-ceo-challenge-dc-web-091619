console.log('%c HI', 'color: firebrick');


document.addEventListener("DOMContentLoaded", function() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(json => {
            json.message.forEach(link => addPictures(link))
        });
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(breed => {
            Object.keys(breed.message).forEach(thing => {
                addBreed(thing)
            })
        })
    const dropdown = document.getElementById("breed-dropdown");
    dropdown.addEventListener("change", firstLetter)
});

function addPictures(link){
    const box = document.getElementById("dog-image-container");
    let imageBox = document.createElement("img");
    imageBox.src = link;
    box.appendChild(imageBox)
}

function addBreed(breed){
    const listElm = document.getElementById("dog-breeds");
    let echBreed = document.createElement("li");
    echBreed.innerText = breed;
    echBreed.addEventListener("click",changeColor)
    listElm.appendChild(echBreed);
}

function changeColor(event){
    let dogItem = event.target
    dogItem.style.color = "red"
}

function firstLetter(event){
    const list = document.getElementById("dog-breeds")
    while (list.firstChild){
        list.removeChild (list.firstChild)
    }
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(breed => {filterThingy (Object.keys(breed.message), event)
        })

}

function filterThingy(breedArray, event){
   let doglist =  breedArray.filter(breed => {
        return event.target.value === breed[0]
    })
    doglist.forEach(thing => {
        addBreed(thing)
    })
}



