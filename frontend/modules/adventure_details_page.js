import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let param = new URLSearchParams(search)
  let id = param.get("adventure")

  if( id !== null ){
    return id;
  }

  return null;
  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  let data = null
  try
  {
    data = await fetch(config.backendEndpoint+`/adventures/detail?adventure=${adventureId}`).then(res => res.json())
    // console.log(data)
    return data
  }
  catch(err)
  {
    return data;
  }

  
  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // name,subtitle,content,images
  // adventure-name
  // adventure-subtitle
  // photo-gallery
  // adventure-content
  document.getElementById("adventure-name").textContent = adventure.name
  // console.log(adventure["name"])
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle
  document.getElementById("adventure-content").textContent = adventure.content
  let DOMimages = document.getElementById("photo-gallery")
  let images =  adventure.images

  images.forEach(img => {
    let im = document.createElement("img")
    im.setAttribute("src",img)
    im.className = "activity-card-image"
    // im.setAttribute("height",100)
    // im.setAttribute("width",100)
    DOMimages.append(im)
  })
  
  


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  // console.log(images)
//  create div
let carousel = document.createElement("div")
carousel.setAttribute("id","carouselExampleIndicators")
carousel.setAttribute("data-bs-ride","carousel")
carousel.className = "carousel slide"

let carouselInner = document.createElement("div")
carouselInner.className = "carousel-inner"

let carosuelIndicator = document.createElement("div")
carosuelIndicator.className = "carousel-indicators"
// <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>

images.map( (img,index) => {
  let carouselItem = document.createElement("div")
  carouselItem.className = "carousel-item"
  
  let im = document.createElement("img")
  
  let controlButton = document.createElement("button")
  controlButton.setAttribute("type","button")
  controlButton.setAttribute("data-bs-target","#carouselExampleIndicators")
  // console.log(index)
  controlButton.setAttribute("data-bs-slide-to",`${index}`)
  controlButton.setAttribute("aria-label",`Slide`+`${index}`)

  if(index === 0){
    carouselItem.className = "carousel-item active"
    controlButton.className = "active"
    controlButton.setAttribute("aria-current",true)
  }
  
  im.setAttribute("src",img)
  im.className = "image-responsive"
  im.setAttribute("height",500)
  im.setAttribute("width",800)

  carouselItem.append(im)
  carosuelIndicator.append(controlButton)
  carouselInner.append(carouselItem)
})


let control = document.createElement("button")
control.setAttribute("data-bs-target","#carouselExampleIndicators")
control.setAttribute("data-bs-slide","prev")
control.className = "carousel-control-prev"
control.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
'<span class="visually-hidden">Previous</span>'

let control2 = document.createElement("button")
control2.className = "carousel-control-next"
control2.setAttribute("data-bs-target","#carouselExampleIndicators")
control2.setAttribute("data-bs-slide","next")
control2.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
'<span class="visually-hidden">Next</span>'

carousel.append(carosuelIndicator,carouselInner)
carousel.append(control,control2)

let photo = document.getElementById("photo-gallery")
photo.innerHTML = ""
photo.append(carousel)
// console.log(document.getElementById("photo-gallery"))

// console.log(carousel)
// set class to carousel-item
// if index === 1 set class to active
// else follow simple structure of carousel item


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure)
  let soldOutPanel = document.getElementById("reservation-panel-sold-out")
  let reservationPanel = document.getElementById("reservation-panel-available")
  
  if(adventure.available)
  {
    soldOutPanel.style.display = "none"
    reservationPanel.style.display = "block"
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead
  }
  else
  {
    // adventure.available = false
    reservationPanel.style.display = "none"
    soldOutPanel.style.display = "block"

  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) 
{
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(persons)
  // console.log(adventure)

  document.getElementById("reservation-cost").textContent = adventure.costPerHead * persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) 
{
  // console.log(adventure.id)
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  
  //SubTask-1 Add a event handler
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let formEle = form.elements;
    let url = config.backendEndpoint+"/reservations/new"

    let name = formEle["name"].value
    let date = formEle["date"].value
    let person = formEle["person"].value
    let id = adventure.id

    let formData = JSON.stringify({
      name: name,
      date: date,
      person: person,
      adventure: id
    })
  
    // console.log(formData)
    
    try{
       let res = await fetch(url,{
        method:"POST",
        headers: {"Content-type": "application/json "},
        body: formData
      })
      // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
      if(res.ok){
        location.reload()
        alert("Success")
      }else
      {
        alert("Failed!")
      }
   
    }catch(e){
      alert("Failed!-Try again")
    }
    
     
  // End of event Listener
  })

  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure.reserved)
  let ele = document.getElementById("reserved-banner")
  if(adventure.reserved)
  {
    ele.style.display = "block"
  }
  else
  {
    ele.style.display = "none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
