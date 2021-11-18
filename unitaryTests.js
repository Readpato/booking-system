function testNameValidation() {
    console.assert(validateName("") === "The name of the client has not been given.",
    "The function validateName didn't check if the client name is empty."
    );

    console.assert(validateName("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA") === "The name of the client is too long.",
    "The function validateName didn't check if the client name is too long."
    );

    console.assert(validateName("P4trick! Ra3dler") === "The name of the client has not been inserted correctly.",
    "The function validateName didn't check if the client name has invalid characters."
    )
}

testNameValidation();