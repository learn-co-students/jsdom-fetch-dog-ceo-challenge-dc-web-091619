document.addEventListener('DOMContentLoaded', function(){
  
  fetch('https://dog.ceo/api/breeds/image/random/4')
  .then(response => response.json())
  .then(json => insertImages(json))

  fetchDogBreeds();

  const selectedBreed = document.getElementById('breed-dropdown')
  selectedBreed.addEventListener('change', fetchDogBreeds)
})

function insertImages(json){
  const dogDiv = document.getElementById('dog-image-container')
  json.message.forEach(function(element){
    const dogContainer = document.createElement('div')
    let dogImg = document.createElement('img');
    dogImg.srcset = element;
    dogContainer.appendChild(dogImg);
    dogDiv.appendChild(dogContainer)
  })
}

function fetchDogBreeds(){
  return fetch('https://dog.ceo/api/breeds/list/all')
  .then(response =>  response.json())
  .then(json => filterBreeds(json));

}

function dogBreeds(array){
  const breedList = document.getElementById('dog-breeds');
  breedList.innerHTML = "";

  if (array.length === 0){
    let errorMsg = document.createElement('p');
    let selectedLetter = document.getElementById('breed-dropdown').value 
    errorMsg.innerHTML = `No record of dog breeds starting with the letter "<em>${selectedLetter}</em>"`
    breedList.append(errorMsg)
  } else {
    array.forEach(function(element){
      let newLi = document.createElement('li');
      newLi.innerText = element[0].toUpperCase() + element.slice(1);

      newLi.addEventListener('click', changeColor)

      breedList.appendChild(newLi);
    })
  }
}

function changeColor(){
  let r = Math.floor(Math.random() * 255)
  let g = Math.floor(Math.random() * 255)
  let b = Math.floor(Math.random() * 255)
  event.target.style.color = `rgb(${r},${g},${b})`
}

function filterBreeds(json){
  let testArray = Object.keys(json.message);
  // let testArray = Object.keys(json.message)
  
  let selectedLetter = document.getElementById('breed-dropdown').value 
  
  if (selectedLetter === "") {
    dogBreeds(testArray)
  } else {
    let filteredArray = testArray.filter(breed => breed[0] === selectedLetter)
    dogBreeds(filteredArray) 
  }
}