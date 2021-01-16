export const VALIDATION_MESSAGES = {
    firstName: [
        {type: 'required', message: 'First name is required'},
        {type: 'minlength', message: 'Min length is 2 characters'},
        {type: 'maxlength', message: 'Min length is 25 characters'},
    ],
    lastName: [
        {type: 'required', message: 'Last name is required'},
        {type: 'minlength', message: 'Min length is 2 characters'},
        {type: 'maxlength', message: 'Min length is 25 characters'},
    ],
    email: [
        {type: 'required', message: 'E-mail is required'},
        {type: 'pattern', message: 'Invalid email address'},
        {type: 'email', message: 'Invalid email address'},
    ],
    pwd: [
        {type: 'required', message: 'Password is required'},
        {type: 'pattern', message: 'Passwords must be at least 8 characters, include 1 number, 1 lowercase letter and 1 uppercase letter.'},
        // {type: 'minlength', message: 'Min length is 8 characters'},
        {type: 'maxlength', message: 'Max length is 40 characters'},
        {type: 'isMatching', message: 'Passwords do not match'}
    ],
    password: [
        {type: 'required', message: 'Password is required'},
        {type: 'pattern', message: 'Passwords must be at least 8 characters, include 1 number, 1 lowercase letter and 1 uppercase letter.'},
        // {type: 'minlength', message: 'Min length is 8 characters'},
        {type: 'maxlength', message: 'Max length is 40 characters'},
        {type: 'isMatching', message: 'Passwords do not match'}
    ],
    dob: [
        {type: 'required', message: 'Date of Birth Required'},
        {type: 'pattern', message: 'Invalid Date Format, Please give date in format DD/MM/YYYY'},
        // {type: 'minAge', message: 'Minimum 5 years old'},
        // {type: 'maxlength', message: 'Max length is 40 characters'},
    ]
}
