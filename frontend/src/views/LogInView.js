
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import * as yup from "yup";

import { Link } from "react-router-dom";
import { Container, Form, FormGroup, FormLabel } from "react-bootstrap";

import { login } from "../actions/userActions";
import { MessageWindow } from "../components/MessageWindow";
import { LoadingWindow } from "../components/LoadingWindow";
import { InputContainer, InputError } from "../ui/StyledForm";


const validationSchema = yup.object({
   email: yup.string()
       .email("Must be a valid email")
       .required("Enter your email"),
   password: yup.string()
       .required("Enter your password"),
});

export const LogInView = (props) => {

   const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
   //redirect query string 2nd value if it doesn't exist return home

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo, loading, error } = userLogin;

   useEffect(() => {
      if(userInfo) {
         //if login successful
         props.history.push(redirect)
      }
   }, [props.history, redirect, userInfo]);

   const dispatch = useDispatch();

   const onSubmit = async (values) => {
      const {email, password} = values;
      dispatch(await login(email, password));
   }

   const formik = useFormik({
      initialValues: {email: "", password: ""},
      validateOnBlur: true,
      onSubmit,
      validationSchema: validationSchema,
   });

   return (
       <Container>
          <Form  className="form" onSubmit={formik.handleSubmit}>
             <FormGroup>
                <h2 className="form-header">Log In</h2>
             </FormGroup>
             {loading && <LoadingWindow></LoadingWindow>}
             {error && <MessageWindow variant="danger">{error}</MessageWindow>}
             <FormGroup className="form-groups">
                <InputContainer>
                   <FormLabel htmlFor="email">Email address</FormLabel>
                   <Form.Control className="form-control"
                                 type="email"
                                 id="email"
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
                                 placeholder="Enter your password"
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
             <FormGroup>
                <FormLabel />
                <button className="form-note-button"
                        type="submit"
                        disabled={!formik.isValid}>Log In
                </button>
             </FormGroup>
             <FormGroup>
                <FormLabel />
                <div className="new-customer">
                   New Customer? <Link to={`/signup?redirect=${redirect}`}>
                   Create an account</Link>
                </div>
             </FormGroup>
          </Form>
       </Container>
   )
};