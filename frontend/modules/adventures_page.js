
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search)
  const queryParam = new URLSearchParams(search)
  const city = queryParam.get('city')
  // console.log(city)
  // return 
  // console.log(val)

  return city

}




//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const city_name = city
  // console.log(city)
  try{
    const res = await fetch( config.backendEndpoint+`/adventures?city=${city_name}`).then(res => res.json())
    console.log(res)
    return res
  }catch(e){
    return null
  }





}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures

function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(key => {

    let colDiv = document.createElement("div")
    colDiv.className = "col-lg-3 col-6 mb-4 p-3"
    colDiv.innerHTML = `<a href="detail/?adventure=${key.id}" id=${key.id}>
    <div class="activity-card">
    <div class="category-banner">${key.category}</div>  
        <img
          class="img-responsive activity-card-image"
          src=${key.image}
        />

        <div class="activity-card-text text-md-center w-100 mt-3">
          <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left ">${key.name}</h5>
            <p>₹${key.costPerHead}</p>
          </div>
            <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
            <h5 class="text-left">Duration</h5>
            <p>${key.duration} Hours</p>
          </div>
        </div>
      </div>
    </a>
  `;

  document.getElementById("data").append(colDiv);

  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let durationList = []
  durationList = list.filter(adv => adv.duration >= low && adv.duration <= high)
  return durationList
}


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filterdListByCategory = []
  filterdListByCategory = list.filter(adv => categoryList.includes(adv.category))
  return filterdListByCategory
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
  if ((filters.category.length != 0) && (filters.duration.length != 0)) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    let durationFiltered = filterByDuration(list, lowTime, highTime);
    return filterByCategory(durationFiltered, filters.category);
  }
  if (filters.category.length != 0) {
    return filterByCategory(list, filters.category);
  }
  if (filters.duration.length != 0) {
    let lowTime = filters.duration.split("-")[0];
    let highTime = filters.duration.split("-")[1];
    return filterByDuration(list, lowTime, highTime);
  }
  else {
    return list;
  }
  // let filterList = []
  // let filterDuration = []
  // let category = filters["category"]
  // let duration = filters["duration"]
  // if(category !== null)
  // {
  //   filterList = filterByCategory(list,category)
  // }
  // if(duration != null)
  // {
  //   let low = duration.split('-')[0]
  //   let high = duration.split('-')[1]
  //   filterDuration = filterByDuration(list,low,high)
    
  // }


  // if(category !== null && duration !== null){

  //   filterDuration = filterByDuration(list,low,high)
  //   filterList.concat(filterDuration)
  //   return filterList;

  // }else if(category === null && duration !== null){

  //   return filterDuration
  // }else{
  //   return filterList
  // }
  // // return list

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let Stringfilter = JSON.stringify(filters)
  localStorage.setItem("filters",Stringfilter)
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let x = JSON.parse(localStorage.getItem("filters"))
  // console.log(x)
  // Place holder for functionality to work in the Stubs
  return x;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList = document.getElementById("category-list")
  // filter === adventuresNames so we need access to adventures names first and then we can filter from it.
  let filterCat = filters["category"]

  filterCat.forEach(cat => {
    let p = document.createElement("p")
    p.className = "category-filter"
    p.textContent = cat

    categoryList.append(p)
  })

  

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
