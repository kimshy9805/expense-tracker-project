import { Marginer } from "components/marginer";
import { useFormik } from "formik";
import React, { Component, useContext, useState } from "react";
import { AccountContext } from "./accountContext";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  FormSuccess,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import * as yup from "yup";
import Axios from "../../services/http-common";

// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validationSchema = yup.object({
  fullName: yup
    .string()
    .min(3, "Please enter you real name")
    .required("Full name is required!"),
  email: yup.string().email("Please enter a valid email address").required(),
  password: yup
    .string()
    // .matches(PASSWORD_REGEX, "Please enter a strong password")
    .required(),
  confirmedPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Password does not match"),
    }),
});

export const SignUpForm = (props) => {
  const { switchToSignin } = useContext(AccountContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const { confirmedPassword, ...data } = values;
    const response = await Axios.post("/auth/registration", data).catch(
      (err) => {
        if (err && err.response) setError(err.response.data.message);
        setSuccess(null);
      }
    );

    if (response && response.data) {
      console.log(response);
      setSuccess(response.data.message);
      formik.resetForm();
      setError(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmedPassword: "",
    },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      {!error && <FormSuccess>{success ? success : ""}</FormSuccess>}
      {!success && <FormError>{error ? error : ""}</FormError>}
      <FormContainer onSubmit={formik.handleSubmit}>
        <FieldContainer>
          <Input
            name="fullName"
            type="fullName"
            placeholder="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {
            <FieldError>
              {formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            placeholder="Email"
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <FieldContainer>
          <Input
            name="confirmedPassword"
            type="confirmedPassword"
            placeholder="Confirmed Password"
            value={formik.values.confirmedPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {
            <FieldError>
              {formik.touched.confirmedPassword &&
              formik.errors.confirmedPassword
                ? formik.errors.confirmedPassword
                : ""}
            </FieldError>
          }
        </FieldContainer>
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          SignUp
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
