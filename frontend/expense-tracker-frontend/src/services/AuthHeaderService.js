import React, { Component } from "react";

export const AuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt) {
    return { Authorization: "Bearer " + user.jwt };
  }
  return {};
};
