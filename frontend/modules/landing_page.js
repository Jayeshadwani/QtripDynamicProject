import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // console.log(config.backendEndpoint+"/cities")
  let cities = await fetchCities();


  // console.log("HEllo from init")

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  // console.log(cities)
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try
  {
    let citiesArray = await fetch(config.backendEndpoint+"/cities").then(data => data.json())
    return citiesArray
  }catch(e){
    return null
  }
  
  // console.log(citiesArray)
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let col = document.createElement("div")
  col.className = "col-lg-3 col-6 mb-4 text-center"

  // console.log(col)
  
  // Create elements in this structure tile -> tile-text img
  let a = document.createElement("a")
  a.setAttribute("href",`/pages/adventures/city?=${id}`)
  a.setAttribute("id",id)

  let tile = document.createElement("div")
  tile.className = "tile"
  tile.id = id

  let tileText = document.createElement("div")
  tileText.className = "tile-text"
  
  let cityName = document.createElement("h3")
  cityName = city;

  let desc = document.createElement("p")
  desc.textContent = description

  tileText.append(cityName,desc)

  let img  = document.createElement("img")
  img.setAttribute("src",image)

  tile.append(tileText,img)


  a.append(tile)
  col.append(a)

  let DOMObject = document.getElementById("data")
  DOMObject.append(col)


}

export { init, fetchCities, addCityToDOM };
