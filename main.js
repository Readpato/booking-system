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

$form.onsubmit = validateForm;

function validateForm(event) {
    
    let clientName = $form.clientName.value;
    let hourOfBooking = document.form["hour-of-booking"].value;
    let peopleQuantity = $form["number-of-people"].value;
    let clientCellphone = $form["client-cellphone"].value;

    const errorName = validateName(clientName);
    const errorQuantity = validateClientQuantity(peopleQuantity);
    const errorBookingHour = validateBookingHour(hourOfBooking);
    const errorClientCellphone = validateClientCellphone(clientCellphone);

    const errors = {
        clientName: errorName,
        "number-of-people": errorQuantity,
        "hour-of-booking": errorBookingHour,
        "client-cellphone": errorClientCellphone        
    };

    console.table(errors);

    const success = errorHandling(errors) === 0;

} // * This basically says that if the function is TRUE, you should run it.
    if (success) {
    //* Here we have to add a validation to check the available space.
    checkAvailableSpace(hourOfBooking)
    addReservation(clientName, selectBookingSegment(hourOfBooking), peopleQuantity, clientCellphone);
    updateAvailableSpace(hourOfBooking, peopleQuantity);
    event.preventDefault();

};

// * Function that handles the errors.

function errorHandling(errors) {

    const error = errors;
    const keys = Object.keys(errors);
    let errorQuantity = 0;


    keys.forEach(function(key) {
        if (error[key]) {
            $form[key].classList.add('error');
            $form[key].value = '';
        
            const $errorsList = document.querySelector('.errorsList');
            const $error = document.createElement('li');
            $error.textContent = error[key];
            $error.className = 'existingError';
            $errorsList.appendChild($error);

            errorQuantity++;
        } else {
            $form[key].className = '';
        }

    });
    return errorQuantity;
};


// TODO We also need to create the function that handles the errors and the element where it will appear in HTML.

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
    }
};

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
};

// *Function that takes the values of the inputs and places them in the respective booking segment.

function addReservation(clientName, bookingHour, peopleQuantity, clientCellphone) {

    let $newReservation = document.createElement("p");
    $newReservation.innerText = `${clientName} - ${peopleQuantity} person(s) - ${clientCellphone}`;
    
    return bookingHour.appendChild($newReservation);
};


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
    };
    return document.querySelector(`.availableSpace${hourOfBooking}`).innerText = currentSpace;
};

//* Functions that validate the inputs.

function validateName(clientName) {
    
    const regEx = /^[a-z]+ [a-z]+$/i;

    if(!clientName) {
        return "The name of the client has not been given."
    };

    if(clientName.length >= 50) {
        return "The name of the client is too long."
    };
  
    if(regEx.test(clientName) === false) {
        return "The name of the client has not been inserted correctly."
    };

    return '';
};

function validateClientQuantity(peopleQuantity) {
    const regEx = /^[0-9]{1,2}$/;

    if (!peopleQuantity) {
        return "The quantity of people has not been given."
    };

    if (peopleQuantity > 20) {
        return "The quantity of people exceeeds the booking hour capacity."
    };

    if (regEx.test(peopleQuantity) === false) {
        return "The quantity of people has invalid characters."
    };

    return "";
};


function validateBookingHour(hourOfBooking) {

    if(!hourOfBooking) {
        return "The hour of the booking hasn't been selected."
    };

    return "";
};

function validateClientCellphone(clientCellphone) {

    const regEx = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*\d\W*(\d{1,2})$/;

    if (!clientCellphone) {
        return "The client cellphone has not been specified."
    };

    if (regEx.test(clientCellphone) === false) {
        return "The client cellphone is not valid."
    };

    return "";
};
