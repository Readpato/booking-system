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

// ! Add function that deletes old errors!

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

    deletePreviousErrors();

    const success = errorHandling(errors) === 0;

    // * This basically says that if the function is TRUE, you should run it.
    if (success) {
        if (checkAvailableSpace(hourOfBooking) === true ) {
        addReservation(clientName, selectBookingSegment(hourOfBooking), peopleQuantity, clientCellphone, hourOfBooking);
        updateAvailableSpace(hourOfBooking, peopleQuantity);
        };
    };
    
    event.preventDefault();
};

// *Function that runs when the event handler is called on the delete button.

document.querySelector('.delete-booking-button').onclick = function(event) {
    let checkedBookings = document.querySelectorAll('input[type="checkbox"]:checked');

    deleteExistingBooking(checkedBookings);
    restoredCanceledSpace();
    
    event.preventDefault();
};

// * Function that handles the errors.

function errorHandling(errors) {

    const error = errors;
    const keys = Object.keys(errors);
    let errorQuantity = 0;

    keys.forEach(function(key) {
        if (error[key]) {
            $form[key].id = ('error');
            $form[key].value = '';
        
            const $errorsList = document.querySelector('.errorsList');
            const $error = document.createElement('li');
            $error.textContent = error[key];
            $error.className = 'existingError';
            $errorsList.appendChild($error);

            errorQuantity++;
        } else {
            $form[key].id = '';
        }

    });
    return errorQuantity;
};

// *Function that assess if there's still available space on an hour segment.

// TODO Add a logical operator OR here.

function checkAvailableSpace(hourOfBooking) {
    
    let availableSpace = Number(document.querySelector(`.availableSpace${hourOfBooking}`).innerText);
    let numberOfClients = Number($form["number-of-people"].value);
    
    if (availableSpace < 0 || availableSpace - numberOfClients < 0) {
        const $errorsList = document.querySelector('.errorsList');
        const $error = document.createElement('li');
        $error.textContent = "There is no space for this booking.";
        $error.className = 'existingError';
        $errorsList.appendChild($error);
        return false;
    } else {
        return true;
    };
};

// *Function that selects the hour of the reservation

function selectBookingSegment(hourOfBooking) {
    const $bookingsAt19 = document.querySelector(".bookingsAt19");
    const $bookingsAt20 = document.querySelector(".bookingsAt20");
    const $bookingsAt2030 = document.querySelector(".bookingsAt2030");
    const $bookingsAt21 = document.querySelector(".bookingsAt21");


    if (hourOfBooking === "19") {
        return $bookingsAt19;
    };
    if (hourOfBooking === "20") {
        return $bookingsAt20;
    };
    if (hourOfBooking === "2030") {
        return $bookingsAt2030;
    };
    if (hourOfBooking === "21") {
        return $bookingsAt21;
    };
    if (hourOfBooking === "") {
        return console.log("The booking hour wasn't selected");
    };
};

// *Function that takes the values of the inputs and places them in the respective booking segment.

function addReservation(clientName, bookingHour, peopleQuantity, clientCellphone, hourOfBooking) {

    let $newReservation = document.createElement('div');
    $newReservation.className = "existing-booking";
    let $checkbox = document.createElement('input');
    $checkbox.type = 'checkbox';
    let $paragraph = document.createElement("p");
    $paragraph.innerText = `${clientName} - ${clientCellphone} - Quantity: `;
    let $quantityOfPeople = document.createElement('div');
    $quantityOfPeople.className = `quantity-at-${hourOfBooking}`
    $quantityOfPeople.innerText = `${peopleQuantity}`

    $newReservation.appendChild($checkbox);
    $newReservation.appendChild($paragraph);
    $newReservation.appendChild($quantityOfPeople);

    return bookingHour.appendChild($newReservation);
};


//* Function that updates the availableSpace counter

function updateAvailableSpace(hourOfBooking, peopleQuantity) {
    let availableSpace =  Number(document.querySelector(`.availableSpace${hourOfBooking}`).innerText);
    let currentSpace = (availableSpace - peopleQuantity);

    // Necesito hacer que la cantidad total de clientes de los clientes totales sea igual al currentSpace

    if (currentSpace <= 0) {
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
        return "The quantity of people exceeds the booking hour capacity."
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




// *Function that removes previous errors.

function deletePreviousErrors() {
    let previousErrors = document.querySelectorAll(".existingError");

    previousErrors.forEach(function(error) {
        return error.remove();
    }
)};

//* Function that removes checked bookings.

function deleteExistingBooking(existingBooking) {
    
    existingBooking.forEach(function(booking){
        booking.parentElement.remove();
    });
};


//* Function that restores the available space to a booking segment.

function restoredCanceledSpace() {

    const bookingHours = [19, 20, 2030, 21];

    bookingHours.forEach(function(hour){
        let totalQuantityOfPeople = document.querySelectorAll(`.quantity-at-${hour}`);
        if (totalQuantityOfPeople.length === 0) {
            document.querySelector(`.availableSpace${hour}`).classList.remove("full");
            document.querySelector(`.booking${hour}`).classList.remove("full-booking");
            document.querySelector(`.option${hour}`).removeAttribute("disabled");
            return document.querySelector(`.availableSpace${hour}`).innerText = 20;
        }

        for (let i = 0; i < totalQuantityOfPeople.length; i++) {
        let accumulator = 0 + Number(totalQuantityOfPeople[i].innerText);
        let totalSpace = 20;
        let newAvailableSpace = totalSpace - accumulator;

        if (newAvailableSpace <= 0) {
            document.querySelector(`.availableSpace${hour}`).classList.add("full");
            document.querySelector(`.booking${hour}`).classList.add("full-booking");
            document.querySelector(`.option${hour}`).setAttribute("disabled", "");
        } else if (newAvailableSpace > 0) {
            document.querySelector(`.availableSpace${hour}`).classList.remove("full");
            document.querySelector(`.booking${hour}`).classList.remove("full-booking");
            document.querySelector(`.option${hour}`).removeAttribute("disabled");
        };
        return document.querySelector(`.availableSpace${hour}`).innerText = newAvailableSpace;    
        };
    });
    return;
};

