/**
 * *Things that we have to do!
 * *Once the submit button is clicked, we need it to correctly get the values that the inputs have.
 * *The most important thing is to sort the reservations with the hour they chose to come and add the input values in them.
 * *Once a booking system is has reached its maximum capacity of 20 persons it should block itself and not allow any more bookings.
 * 
 * *Bonus: Create a button that eliminates a booking if clicked upon.
 *  */

/* Global Variables */

const $form = document.form;


// * Function that happens when the submit button is clicked.

document.querySelector(".createNewBooking").onclick = function(event) {

    addReservation(selectBookingHour());
    event.preventDefault();
}

// *Function that assess if there's still available space on an hour segment.

function calculateAvailableSpace()


// *Function that selects the hour of the reservation

function selectBookingHour() {
    let $hourOfBooking = document.form["hour-of-booking"].value;
    const $bookingsAt19 = document.querySelector(".bookingsAt19");
    const $bookingsAt20 = document.querySelector(".bookingsAt20");
    const $bookingsAt2030 = document.querySelector(".bookingsAt2030");
    const $bookingsAt21 = document.querySelector(".bookingsAt21");


    if ($hourOfBooking === "19") {
        return $bookingsAt19;
    }
    if ($hourOfBooking === "20") {
        return $bookingsAt20;
    }
    if ($hourOfBooking === "20:30") {
        return $bookingsAt2030;
    }
    if ($hourOfBooking === "21") {
        return $bookingsAt21;
    }
}


// *Function that takes the values of the inputs and places them in the respective booking hour


function addReservation(bookingHour) {
    let clientName = $form.clientName.value;
    let peopleQuantity = $form["number-of-people"].value;
    let clientCellphone = $form["client-cellphone"].value;

    let $newReservation = document.createElement("p");
    $newReservation.innerText = `${clientName} - ${peopleQuantity} persons - ${clientCellphone}`;
    
    return bookingHour.appendChild($newReservation);
}
