import * as yup from 'yup';

export const schemaForChangingPassword = yup.object().shape({
  password: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      'Пароль должен содержать хотя бы одну цифру, хотя бы одну латинскую букву  в разных регистрах'
    )
    .required('Введите пароль!'),
  newPassword: yup
    .string()
    .matches(
      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
      'Пароль должен содержать хотя бы одну цифру, хотя бы одну латинскую букву  в разных регистрах'
    )
    .required('Введите пароль!')
});
