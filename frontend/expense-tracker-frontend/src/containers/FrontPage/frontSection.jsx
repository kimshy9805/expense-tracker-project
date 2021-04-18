import { Button } from "components/button/index.jsx";
import { Logo } from "components/logo/index.jsx";
import { Marginer } from "components/marginer/index.jsx";
import { Navbar } from "components/navbar/index.jsx";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  BackGroundFilter,
  FrontSectionContainer,
  MotivationalText,
} from "./styled.js";

export const FrontSection = () => {
  return (
    <FrontSectionContainer>
      <BackGroundFilter>
        <Navbar />
        <Marginer direction="vertical" margin="7em" />
        <Logo />
        <Marginer direction="vertical" margin="3em" />
        <MotivationalText>
          We are here to provide the best service for your finance
        </MotivationalText>
        <MotivationalText>What are you waiting for?</MotivationalText>
        <Marginer direction="vertical" margin="2em" />
        <Link
          to={{
            pathname: "/registration",
          }}
        >
          <Button>Start Now</Button>
        </Link>
      </BackGroundFilter>
    </FrontSectionContainer>
  );
};
