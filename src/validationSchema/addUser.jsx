import * as yup from 'yup';

const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const phoneRegexp =/^[+]?3?[\s]?8?[\s]?\(?0\d{2}?\)?[\s]?\d{3}[\s|-]?\d{2}[\s|-]?\d{2}$/

// /^\+380(\s|\(\d{3}\))?\d{9}$/;
// /^\+38\s\((0\d{2})\)\s\d{3}\s-\s\d{2}\s-\s\d{2}$/;

export const loginSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Not less than 2 characters')
    .max(60, 'Not more than 60 characters')
    .required('Please enter your name, f.e: John'),
  email: yup
    .string()
    .matches(emailRegexp, 'F.e.:jhon@example.com')
    .required('Please enter your email'),
  phone: yup
    .string()
    .matches(phoneRegexp, '+38 (0XX) XXX - XX - XX')
    .required('Please enter your phone number'),
  position_id: yup.string().required(),
  photo: yup.string().required('Photo is required'),
});
