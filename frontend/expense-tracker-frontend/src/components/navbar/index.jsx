import { Button } from "components/button";
import { Logo } from "components/logo";
import { Marginer } from "components/marginer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.div`
  width: 100%;
  height: 35px;
  padding: 0 2em;
  margin-top: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const AccessibilityContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BrandContainer = styled.div``;

const LoginButton = styled(Button)`
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
    background-color: transparent;
    border: none;
    color: rgb(212, 212, 212);
  }
`;

//props? 이용해서 state 바꾸는거 어캐함..?
export function Navbar(props) {
  const [page, setPage] = useState("frontPage");

  useEffect(() => {
    setPage(props.page);
  }, []);

  return (
    <NavbarContainer>
      <BrandContainer>
        <Logo inline />
      </BrandContainer>
      {page === "homePage" && (
        <AccessibilityContainer>
          <Marginer direction="horizontal" margin="8px" />
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <LoginButton small>Logout</LoginButton>
          </Link>
        </AccessibilityContainer>
      )}
      {page === "frontPage" && (
        <AccessibilityContainer>
          <Link
            to={{
              pathname: "/registration",
            }}
          >
            <Button small>Get Started </Button>
          </Link>
          <Marginer direction="horizontal" margin="8px" />
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <LoginButton small>Login</LoginButton>
          </Link>
        </AccessibilityContainer>
      )}
    </NavbarContainer>
  );
}
