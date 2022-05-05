import * as yup from 'yup';

export const schemaForLoginForm = yup.object().shape({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Введите корректный email')
    .required('Введите email!'),
  password: yup.string().required('Введите пароль!'),
});

