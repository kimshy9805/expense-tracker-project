import { Marginer } from "components/marginer";
import { FormikContext, useFormik } from "formik";
import React, { Component, useContext, useState } from "react";
import { AccountContext } from "./accountContext";
import {
  BoldLink,
  BoxContainer,
  FieldContainer,
  FieldError,
  FormContainer,
  FormError,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import * as yup from "yup";
import Axios from "services/http-common";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setAccount } from "services/actions";

const validationSchema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const actionDispatcher = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  setAccount: (account) => dispatch(setAccount(account)),
});

export const LoginForm = (props) => {
  let history = useHistory();
  const { switchToSignup } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const { setToken, setAccount } = actionDispatcher(useDispatch());

  const onSubmit = async (values) => {
    setError(null);
    const response = await Axios.post("auth/login", values).catch((err) => {
      if (err && err.response) setError(err.response.data.message);
    });

    //store global jwt that can be used for every requests.
    if (response) {
      alert("Welcome back in. Authenticating...");
      let token = response.data.jwt;
      let account = values;
      console.log("token from server ", token);
      console.log("account  from server ", account);
      setAccount(account);
      setToken(token);

      history.push("/home");
      // window.location.reload();
    }
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      <FormError>{error ? error : ""}</FormError>
      <FormContainer onSubmit={formik.handleSubmit}>
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
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            placeholder="Password"
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
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1em" />
        <SubmitButton type="submit" disabled={!formik.isValid}>
          Login
        </SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
};
