console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
  const imgURL = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgURL)
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
      json.message.forEach((animal) => {
          addImages(animal)
      })
  })

  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
      for(const key in json.message) {
          const value = json.message[key]
          if (value != []) {
              addSubbreed(key, value)}
          else {addBreed(key)}
      }
  })

  const dropdown = document.getElementById("breed-dropdown")
  dropdown.addEventListener("change", filterBreed);

});

function addImages(image) {
  const imgs = document.getElementById('dog-image-container');
  const img = document.createElement('img');
  imgs.appendChild(img);
  img.src = image;
}

function addBreed(breed) {
  const ulElement = document.getElementById("dog-breeds");
  const liElement = document.createElement("li");
  ulElement.appendChild(liElement);
  liElement.innerText = breed;
  liElement.addEventListener("click", changeColor);
  liElement.classList.add(`${breed[0]}`);
  return liElement;
}

function addSubbreed(key, value) {
  const parentBreed = addBreed(key);
  value.forEach((subBreed) => {
      const subBreedUl = document.createElement("ul")
      parentBreed.appendChild(subBreedUl)
      const childBreed = document.createElement("li");
      subBreedUl.appendChild(childBreed);
      childBreed.innerText = subBreed;
      childBreed.addEventListener("click", changeColor);
  })
}

function changeColor(event) {
  event.target.style.color = "red"
}

function filterBreed(event) {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  fetch(breedUrl)
  .then(function(response) {
      return response.json();
  })
  .then(function(json) {
      //debugger
      for(const key in json.message) {
         // debugger
          if (key[0] != event.target.value) {
              delete json.message[key];
          }}
          document.getElementById('dog-breeds').innerHTML = "";
      for (const key in json.message) {
          const value = json.message[key]
          if (value != []) {
              addSubbreed(key, value)}
          else {addBreed(key)}}
  })

}
