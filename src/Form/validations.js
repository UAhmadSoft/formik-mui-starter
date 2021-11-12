import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup
    .string('Enter your Email')
    .email('Email must be valid')
    .required('Email is required'),
  password: yup
    .string('Enter your Password')
    .min(8, 'Password must be greater than 8 characters')
    .required('Password is required'),
  passwordConfirm: yup
    .string('Enter your Password')
    .oneOf([yup.ref('password')], 'Passwords NOT matched')
    .required('Password Confirm is required'),
});

export default validationSchema;
