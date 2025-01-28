const validator = require('validator');
// const { all } = require('../routes/auth');

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password!");
    }
}


const validateProfileEditData = (req) => {
    const allowedEditfields = [
        'firstName',
        'lastName',
        'emailId',
        'age',
        'gender',
        'photoUrl',
        'about',
        'skills',
    ];

    const isallowedEdit = Object.keys(req.body).every((field) => 
        allowedEditfields.includes(field)
    );

    return isallowedEdit;
};

module.exports = {
    validateSignUpData,
    validateProfileEditData
};