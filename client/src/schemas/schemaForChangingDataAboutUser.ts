import * as yup from 'yup';

export const schemaForChangingDataAboutUser = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Имя должно содержать русские или латинские буквы разных регистров')
    .required('Введите имя'),
  lastName: yup
    .string()
    .matches(/^[а-яА-ЯёЁa-zA-Z0-9]+$/, 'Имя должно содержать русские или латинские буквы разных регистров')
    .required('Введите имя'),
});
