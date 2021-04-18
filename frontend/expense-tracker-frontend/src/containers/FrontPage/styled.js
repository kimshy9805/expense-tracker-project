import React, { Component } from "react";
import styled from "styled-components";
import BackGroundImg from "../../assets/pictures/company_team.jpg";

//frontsection container
export const FrontSectionContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${BackGroundImg});
  padding: 0;
  background-size: cover;
  position: relative;
`;

//background filter
export const BackGroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(53, 53, 53, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//Motivational Text
export const MotivationalText = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 25px;
  font-weight: regular;
  line-height: 1.5;
`;
