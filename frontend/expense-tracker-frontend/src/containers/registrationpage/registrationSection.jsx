import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegistrationForm } from "./styled";

const REGISTAR_URL =
  "http://localhost:8080/api/v1/expense-tracker/registration";

export const RegistrationSection = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    alert(
      "Confirmation email has been sent to your email. Please check your email"
    );
    registerUser(data);
  };

  const registerUser = (data) => {
    axios.post(REGISTAR_URL, data).then((res) => {
      console.log(res.data);
    });
  };

  // Messages
  const required = "This field is required";
  const maxLength = "Your input exceed maximum length";

  // Error Component

  //4. onClick시 onClick = (props) => const axios
  return (
    <RegistrationForm>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("firstName", {required:true})} placeholder="First Name" />
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} placeholder="Last Name" />
        </div>
        <div>
          <label>Email</label>
          <input {...register("email", {required:true})} placeholder="Email" />
        </div>
        <div>
          <label>Password</label>
          <input {...register("password")} placeholder="Password" />
        </div>
        <input type="submit" />
        <Link
          to={{
            pathname: "/login",
          }}
        >
          <button>mainPage</button>
        </Link>
      </form>
    </RegistrationForm>
  );
};
