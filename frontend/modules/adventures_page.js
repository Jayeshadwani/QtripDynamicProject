
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search)
  const queryParam = new URLSearchParams(search)
  const city = queryParam.get('city')
  // return 
  // console.log(val)

  return city

}



//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const city_name = city
  try{
    const res = await fetch( `/adventures?city=${city_name}`).then(res => res.json())
    return res
  }catch(e){
    return null
  }





}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(adv => {
    const id = adv.id
    const category = adv.category
    const imgURL = adv.image
    const name = adv.name
    const costPerHead = adv.costPerHead
    const duration = adv.duration

    const link = `detail?adventure=${id}`

    // Target row element and append everything to row
    let row = document.getElementById("data")

    let cardDiv = document.createElement("div")
    cardDiv.className = "col-lg-3 col-6 mb-4"

    let a = document.createElement("a")
    a.setAttribute("href",link)
    a.setAttribute("id",id)

    let tile = document.createElement("div")
    tile.className = "tile border rounded activity-card"

    // Card Img
    let cardImg = document.createElement("img")
    cardImg.setAttribute("src",imgURL)

    // for Text elements
    let tileText = document.createElement("div")
    tileText.className = "tile-text"

    // For category
    let categ = document.createElement("p")
    categ.className = "category-banner"
    categ.textContent = category

  

    // for first 2 text elements -> Name and Price
    let textDiv1 = document.createElement("div")
    textDiv1.className = "d-flex justify-content-between"

    let Name = name
    let cost = costPerHead
    textDiv1.append(Name,cost)


    // for last 2 text elements -> Duration and time
    let textDiv2 = document.createElement("div")
    textDiv2.className = "d-flex justify-content-between"
    let dur = document.createElement("p")
    dur.textContent = "Duration"
    textDiv2.append(dur,duration)


    tileText.append(textDiv1,textDiv2)

    tile.append(tileText,categ,cardImg)

    a.append(tile)

    cardDiv.append(a)

    row.append(cardDiv)

  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods


  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
