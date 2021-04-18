import axios from "axios";
import React, { Component } from "react";
import { useForm } from "react-hook-form";
import { LoginForm } from "./styled";

const LOGIN_URL = "http://localhost:8080/login";

export const LoginSection = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    login(data);
  };

  const login = (data) => {
    axios.post(LOGIN_URL, data).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <LoginForm>
      <div>hi</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register("email")} placeholder="email" />
        </div>
        <div>
          <label>Password</label>
          <input {...register("password")} placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </LoginForm>
  );
};
