import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try
  {
    let reservation = await fetch(config.backendEndpoint+"/reservations").then(res => res.json())
    return reservation
  }catch(e){
    return null;
  }
  


  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  // console.log(document.getElementById("reservation-table-parent"))

  // console.log(reservations[3])

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0)
  {
    document.getElementById("reservation-table-parent").style.display = "block" 
    document.getElementById("no-reservation-banner").style.display = "none" 
  }
  else
  {
    document.getElementById("no-reservation-banner").style.display = "block" 
    document.getElementById("reservation-table-parent").style.display = "none" 
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */


    reservations.forEach(adv => {

      let bookingDateAndTime = new Date(adv.time)
      let bookingdate = bookingDateAndTime.toLocaleString("en-IN",{year:"numeric",month:"long",day:"numeric"})
      let bookingTime = bookingDateAndTime.toLocaleString("en-IN",{hour:"numeric",minute:"numeric",second:"numeric",hour12:true})
      // console.log(bookingdate+","+bookingTime)
      // console.log(adv.id)

      let row = document.createElement("tr")
      row.innerHTML = 
      `<th scope="row">${adv.id}</th> ` +
      `<td>${adv.name}</td> ` +
      `<td>${adv.adventureName}</td> ` +
      `<td>${adv.person}</td> ` +
      `<td>${new Date(adv.date).toLocaleDateString("en-IN",{year:"numeric",month:"numeric",day:"numeric"})}</td>` +
      `<td>${adv.price}</td>` +
      `<td>${bookingdate+", "+bookingTime}</td>` + 
      `<td><div class="reservation-visit-button" id=${adv.id}><a href=../detail/?adventure=${adv.adventure}>Visit Adventure</a></div></td>`  

      document.getElementById("reservation-table").append(row)

    })
}

export { fetchReservations, addReservationToTable };