export const VALIDATION_MESSAGES = {
    login: [
        {type: 'required', message: 'Поле обязательно для заполнения'},
        {type: 'minlength', message: 'Длина должна быть больше 3 символов'},
        {type: 'maxlength', message: 'Длина должна быть больше 128 символов'},
    ],
    email: [
        {type: 'required', message: 'E-mail is required'},
        {type: 'pattern', message: 'Incorrect E-mail'},
        {type: 'email', message: 'Incorrect E-mail'},
    ],
}
