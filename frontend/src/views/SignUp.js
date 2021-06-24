
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";
import { Container, Form, FormGroup, FormLabel } from "react-bootstrap";

import { signup } from "../actions/userActions";
import { MessageWindow } from "../components/MessageWindow";
import { LoadingWindow } from "../components/LoadingWindow";
import { InputContainer, InputError } from "../ui/StyledForm";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const validationSchema = yup.object({
   name: yup.string()
        .min(2, "Please enter your name")
        .required("Enter your name"),
   email: yup.string()
        .email("Must be a valid email")
        .required("Enter your email"),
   password: yup.string()
       .matches(PASSWORD_REGEX, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number")
       .required("Enter your password"),
   confirmPassword: yup.string()
       .required("Please confirm your password")
       .when("password", {
         is: value => (value && value.length > 0 ? true : false),
         then: yup.string().oneOf([yup.ref("password")], "Passwords must match")
   }),
});

export const SignUp = (props) => {

   const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
   //redirect query string 2nd value if it doesn't exist return to home

   const userSignup = useSelector((state) => state.userSignup);
   const { userInfo, loading, error } = userSignup;

   const dispatch = useDispatch();

   useEffect(() => {
      if(userInfo) {
         //if login successful
         props.history.push(redirect)
      }
   }, [props.history, redirect, userInfo]);

   const onSubmit = async (values) => {
      const { name, email, password } = values;
      dispatch(await signup(name, email, password));
      formik.resetForm();
   };
   const formik = useFormik({
      initialValues: {name: "", email: "", password: "", confirmPassword: "", },
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
   });

   return (
     <Container>
             <Form  className="form" onSubmit={formik.handleSubmit}>
                <FormGroup>
                   <h2 className="form-header">Sign Up</h2>
                </FormGroup>
                {loading && <LoadingWindow></LoadingWindow>}
                {error && <MessageWindow variant="danger">{error}</MessageWindow>}
                <FormGroup className="form-groups">
                   <InputContainer>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Form.Control className="form-control"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}
                      />
                      <InputError>
                         {formik.touched.name && formik.errors.name ?
                           formik.errors.name : ""
                         }
                      </InputError>
                   </InputContainer>
                </FormGroup>
                <FormGroup className="form-groups">
                   <InputContainer>
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Form.Control className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                      />
                      <InputError>
                         {formik.touched.email && formik.errors.email ?
                           formik.errors.email : ""
                         }
                      </InputError>
                   </InputContainer>
                </FormGroup>
                <FormGroup className="form-groups">
                   <InputContainer>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Form.Control className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter password"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}
                      />
                      <InputError>
                         {formik.touched.password && formik.errors.password ?
                           formik.errors.password : ""
                         }
                      </InputError>
                   </InputContainer>
                </FormGroup>
                <FormGroup className="form-groups">
                   <InputContainer>
                      <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                      <Form.Control className="form-control"
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    onBlur={formik.handleBlur}
                      />
                      <InputError>
                         {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                           formik.errors.confirmPassword : ""
                         }
                      </InputError>
                   </InputContainer>
                </FormGroup>
                <FormGroup>
                   <FormLabel />
                   <button className="form-note-button"
                           type="submit"
                           disabled={!formik.isValid}>Sign Up
                   </button>
                </FormGroup>
                <FormGroup>
                   <FormLabel />
                   <div className="new-customer">
                      Already have an account? <Link to={`/login?redirect=${redirect}`}>
                      Log In</Link>
                   </div>
                </FormGroup>
             </Form>
     </Container>
   )
}