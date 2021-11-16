/**
 * *Things that we have to do!
 * *Once the submit button is clicked, we need it to correctly get the values that the inputs have.
 * *The most important thing is to sort the reservations with the hour they chose to come and add the input values in them.
 * *Once a booking system is has reached its maximum capacity of 20 persons it should block itself and not allow any more bookings.
 * 
 * *For the available space function, we need to grab the total (document.querySelector) value on the availableSpace element of each segment and then pass it to a number
 * *Then substract from that number(Number(availableSpace)) the incoming booking. (NewBookingValue)
 * *Once the available space goes down to 0, the segment is blocked and nothing else can be added to it.
 * *(Maybe if we can remove the child-option from its parent-select) 
 * 
 * *The interesting thing is going to be when a booking is cancelled and we have to update the available space number to add numbers.
 * *Maybe we can create a function that fetches the value of the available space each time an interaction with the bookings happens?
 * *
 * 
 * 
 * 
 * *Bonus: Create a button that eliminates a booking if clicked upon.
 *  */

/* Global Variables */

const $form = document.form;


// * Function that happens when the submit button is clicked.

document.querySelector(".createNewBooking").onclick = function(event) {
    let hourOfBooking = document.form["hour-of-booking"].value;
    let peopleQuantity = $form["number-of-people"].value;

    checkAvailableSpace(hourOfBooking)
    addReservation(selectBookingSegment(hourOfBooking), peopleQuantity);
    updateAvailableSpace(hourOfBooking, peopleQuantity);
    event.preventDefault();
}

// *Function that assess if there's still available space on an hour segment.

function checkAvailableSpace(hourOfBooking) {
    
    let availableSpace = Number(document.querySelector(`.availableSpace${hourOfBooking}`).innerText);
    let numberOfClients = Number($form["number-of-people"].value);
    
    // !We ned to add a block if this happens, maybe a function that runs to manage the errors?
    if (availableSpace < 0 ) {
        return console.log("There is no space for this booking.");
    } 
    if (availableSpace - numberOfClients < 0) {
        return console.log("There is no space for this booking.");
    } else {
        return;
    }}

// *Function that selects the hour of the reservation

function selectBookingSegment(hourOfBooking) {
    const $bookingsAt19 = document.querySelector(".bookingsAt19");
    const $bookingsAt20 = document.querySelector(".bookingsAt20");
    const $bookingsAt2030 = document.querySelector(".bookingsAt2030");
    const $bookingsAt21 = document.querySelector(".bookingsAt21");


    if (hourOfBooking === "19") {
        return $bookingsAt19;
    }
    if (hourOfBooking === "20") {
        return $bookingsAt20;
    }
    if (hourOfBooking === "2030") {
        return $bookingsAt2030;
    }
    if (hourOfBooking === "21") {
        return $bookingsAt21;
    }
    if (hourOfBooking === "") {
        return console.log("The booking hour wasn't selected");
    }
}

// *Function that takes the values of the inputs and places them in the respective booking segment.

function addReservation(bookingHour, peopleQuantity) {
    let clientName = $form.clientName.value;
    let clientCellphone = $form["client-cellphone"].value;

    let $newReservation = document.createElement("p");
    $newReservation.innerText = `${clientName} - ${peopleQuantity} person(s) - ${clientCellphone}`;
    
    return bookingHour.appendChild($newReservation);
}


//* Function that updates the availableSpace counter

function updateAvailableSpace(hourOfBooking, peopleQuantity) {
    let availableSpace =  Number(document.querySelector(`.availableSpace${hourOfBooking}`).innerText);
    let currentSpace = (availableSpace - peopleQuantity).toString();

    if (currentSpace <= "0") {
        document.querySelector(`.availableSpace${hourOfBooking}`).classList.add("full");
        document.querySelector(`.booking${hourOfBooking}`).classList.add("full-booking");
        document.querySelector(`.option${hourOfBooking}`).setAttribute("disabled", "");

    } else if (currentSpace > 0) {
        document.querySelector(`.availableSpace${hourOfBooking}`).classList.remove("full");
        document.querySelector(`.booking${hourOfBooking}`).classList.remove("full-booking");
        document.querySelector(`.option${hourOfBooking}`).removeAttribute("disabled");
    }
    return document.querySelector(`.availableSpace${hourOfBooking}`).innerText = currentSpace;
}

