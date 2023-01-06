export const onlyNumber = (errorMessage = 'Введите только числа') => (value) => value.split('').every((number) => !Number.isNaN(Number(number)) && number !== ' ' && number) || errorMessage;

export const onlyLongText = (textLength = 3, errorMessage = 'Введите больше символов') => (value) => value.trim().length >= textLength || errorMessage;

export const requiredField = (errorMessage = 'Обязательное поле') => (value) => value.length > 0 || errorMessage;

export const validateForm = async (form) => (await form.validate()).valid;
