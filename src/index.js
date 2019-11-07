document.addEventListener("DOMContentLoaded", function(){
    getAllDogBreeds()
    getDogImages();
    // getDogBreeds();
    const selectElement = document.querySelector("#breed-dropdown");
    selectElement.addEventListener("change", getDogBreeds)
    // filterBreed();
    
})

function getDogImages(){
    fetch ("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(json=>{
            json.message.forEach((url) => {
            renderAnimal(url)
            })
        })
}

    function renderAnimal(url){
        let body = document.querySelector('#dog-image-container')
        let animalDiv = document.createElement('div')
        body.append(animalDiv)
        let animalImg = document.createElement('img')
        animalImg.src = url
        animalDiv.appendChild(animalImg)
    
    }
function getDogBreeds(){
    fetch ("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(json => {
            let breedobject = json.message;
        document.querySelector('#dog-breeds').innerHTML = "";
            for (const key in breedobject){
                
                renderBreed(key)
            }
    
        })


}

    // function onChange(){
    //     console.log("chihuahua")

    // }


    function renderBreed(breed) {
    
        
        const selectElementValue = document.querySelector("#breed-dropdown").value;
        let firstLetter = breed.split("")[0];

        let breedLi = document.createElement('li')
        
        
        if (selectElementValue === firstLetter){
            
            let breedContainer = document.querySelector('#dog-breeds')
            let breedLi = document.createElement('li')
            breedLi.innerText = breed;
            breedContainer.appendChild(breedLi);
            
        }
        

        breedLi.addEventListener("click", function(event){
            event.target.style.color = "red";
        })
        
    }

    function getAllDogBreeds(){
        fetch ("https://dog.ceo/api/breeds/list/all")
            .then(response => response.json())
            .then(json => {
                let breedobject = json.message;
                for (const key in breedobject){
                    
                    renderAllBreeds(key)
                }
        
            })
    
    
    }

    function renderAllBreeds(breed) {
    
        // const selectElementValue = document.querySelector("#breed-dropdown").value;
        // let firstLetter = breed.split("")[0];

        // let breedLi = document.createElement('li')
        
        
        // if (selectElementValue === firstLetter){
            
            let breedContainer = document.querySelector('#dog-breeds')
            let breedLi = document.createElement('li')
            breedLi.innerText = breed;
            breedContainer.appendChild(breedLi);
            
        // }
        

        breedLi.addEventListener("click", function(event){
            event.target.style.color = "red";
        })
        
    }

    // function filterBreed(){
    //    let selectElement = document.querySelector("#breed-dropdown");

    //     ;
    // }
  