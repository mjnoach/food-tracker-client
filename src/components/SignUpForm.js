import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import * as yup from 'yup';
import { logIn, fetchUserData } from '../user_session';
import { Form, Button } from 'react-bootstrap';

const schema = yup.object({
  name: yup.string()
    .min(3, "Too short")
    .max(50, "Too long")
    .required("Required"),
  email: yup.string()
    .email("Invalid email")
    .required("Required"),
  password: yup.string()
    .min(6, "Too short")
    .required("Required"),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], "Passwords must match")
    .min(6, "Too short")
    .required("Required"),
});

class SignUpForm extends Component {
  signUp = (values) => {
    return new Promise((resolve, reject) => {
      axios.post('/users', values)
        .then(response => {
          let data = JSON.parse(response.config.data);
          let email = data.email;
          let password = data.password;
          resolve([email, password]);
        })
        .catch(error => {});
    });
  }

  handleSubmit(values) {
    this.signUp(values)
      .then(([email, password]) => logIn(email, password)
        .then(loggedIn => fetchUserData()
          .then(userData => this.props.history.push('/app'))));
  }

  render() {
    return (
      <div>
        <Formik
          validationSchema={schema}
          onSubmit={(values, actions) => {
            this.handleSubmit(values);
          }}
          initialValues={{
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          }}
        >
          {({
            values,
            errors,
            status,
            touched,
            handleSubmit,
            handleBlur,
            handleChange,
            isSubmitting,
            isValid,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formikName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  isInvalid={touched.name && !!errors.name}
                  isValid={touched.name && !errors.name}
                />
                {touched.name && errors.name &&
                <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group controlId="formikEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={values.email}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  isInvalid={touched.email && !!errors.email}
                  isValid={touched.email && !errors.email}
                />
                {touched.email && errors.email &&
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group controlId="formikPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
                  isValid={touched.password && !errors.password}
                />
                {touched.password && errors.password &&
                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>}
              </Form.Group>
              <Form.Group controlId="formikPasswordConfirmation">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password_confirmation"
                  placeholder="Password"
                  value={values.password_confirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password_confirmation && !!errors.password_confirmation}
                  isValid={touched.password_confirmation && !errors.password_confirmation}
                />
                {touched.password_confirmation && errors.password_confirmation &&
                <Form.Control.Feedback type='invalid'>{errors.password_confirmation}</Form.Control.Feedback>}
              </Form.Group>
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    )
  }
}

export default withRouter(SignUpForm)