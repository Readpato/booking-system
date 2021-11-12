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
const $clientName = $form.clientName.value;
const $peopleQuantity = $form["number-of-people"].value;
const $clientCellphone = $form["client-cellphone"].value;

// * Function that happens when the submit button is clicked.

document.querySelector(".createNewBooking").onclick = function(event) {

    selectBookingHour();
    event.preventDefault();
}

// *Function that selects the hour of the reservation

function selectBookingHour() {
    let $hourOfBooking = document.form["hour-of-booking"].value;
    const $bookingsAt19 = document.querySelector(".bookingsAt19");
    const $bookingsAt20 = document.querySelector(".bookingsAt20");
    const $bookingsAt2030 = document.querySelector(".bookingsAt2030");
    const $bookingsAt21 = document.querySelector(".bookingsAt21");


    if ($hourOfBooking === "19") {
        return console.log($bookingsAt19);
    }
    if ($hourOfBooking=== "20") {
        return $bookingsAt20;
    }
    if ($hourOfBooking=== "20:30") {
        return $bookingsAt2030;
    }
    if ($hourOfBooking=== "21") {
        return $bookingsAt21;
    }
}
