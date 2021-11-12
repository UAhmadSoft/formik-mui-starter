import React from 'react';

import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Container,
  CircularProgress,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import * as yup from 'yup';

// import validationSchema from './validations';

const Form = () => {
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
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      isNotified: false,
    },
    validationSchema: validationSchema,

    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: (values) => {
      console.log(`values`, values);

      formik.setSubmitting(true);
      // setTimeout(() => {
      //   formik.resetForm();
      // }, 10000);
    },
  });

  // * This func allows us to trigger validations in onChange instead of touched + onChange
  const handleFormikChange = (e) => {
    formik.handleChange(e);
    formik.handleBlur(e);
  };

  return (
    <Container style={{ maxWidth: '600px', marginTop: '5rem', p: 3 }}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          style={styles.TextField}
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={handleFormikChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          onBlur={formik.handleBlur}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={handleFormikChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onBlur={formik.handleBlur}
        />
        <TextField
          style={styles.TextField}
          fullWidth
          id='passwordConfirm'
          name='passwordConfirm'
          label='Password Confirm'
          type='password'
          value={formik.values.passwordConfirm}
          onChange={handleFormikChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
        />

        <FormControlLabel
          control={
            <Switch
              checked={formik.values.isNotified}
              onChange={formik.handleChange}
              color='primary'
              name='isNotified'
            />
          }
          label='Receive Notifications'
        />

        <Button
          disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
          variant='contained'
          color='primary'
          type='submit'
        >
          SUBMIT
          {formik.isSubmitting && (
            <CircularProgress style={{ marginLeft: '1rem' }} size={24} />
          )}
        </Button>
      </form>
    </Container>
  );
};

const styles = {
  TextField: {
    marginBottom: '1rem',
  },
};

export default Form;
