function testNameValidation() {
    console.assert(validateName("") === "The name of the client has not been given.",
    "The function validateName didn't check if the client name is empty."
    );

    console.assert(validateName("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") === "The name of the client is too long.",
    "The function validateName didn't check if the client name is too long."
    );

    console.assert(validateName("P4trick! Ra3dler") === "The name of the client has not been inserted correctly.",
    "The function validateName didn't check if the client name has invalid characters."
    );
};

function testClientQuantitityValidation() {

    console.assert(validateClientQuantity("") === "The quantity of people has not been given.",
    "The function validateClientQuantity didn't check if the quantity is empty."
    );

    console.assert(validateClientQuantity(25) === "The quantity of people exceeds the booking hour capacity.",
    "The function validateClientQuantity didn't check if the quantitiy exceeds the booking segment size."
    );

    console.assert(validateClientQuantity("Hello there!") === "The quantity of people has invalid characters.",
    "The function validateClientQuantity didn't check if there are invalid characters."
    );
};

function testBookingHourValidation() {
    
    console.assert(validateBookingHour("") === "The hour of the booking hasn't been selected.",
    "The function validateBookingHOur didn't check if the booking hour selection was empty."
    );
};

function testClientCellphoneValidation() {

    console.assert(validateClientCellphone("") === "The client cellphone has not been specified.",
    "The function validateClientCellphone didn't check if the field is empty."
    );

    console.assert(validateClientCellphone("+A193 9139 Adnz") === "The client cellphone is not valid.",
    "The function validateClientCellphone didn't check if the cellphone was correct."
    );

};

function unitaryTestsForm() {
    testClientQuantitityValidation();
    testNameValidation();
    testBookingHourValidation();
    testClientCellphoneValidation();  
};

unitaryTestsForm();
