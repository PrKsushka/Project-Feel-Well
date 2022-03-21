import * as yup from 'yup';

export const schemaForRegistration = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Некорректный формат email')
    .required('Введите email!'),
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      'Пароль должен содержать хотя бы одну цифру, хотя бы одну латинскую букву  в разных регистрах'
    )
    .required('Введите пароль!'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  firstName: yup
    .string()
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Имя должно содержать русские или латинские буквы разных регистров')
    .required('Введите имя'),
  lastName: yup
    .string()
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Имя должно содержать русские или латинские буквы разных регистров')
    .required('Введите имя'),
});
