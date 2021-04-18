import React, { Component } from "react";
import styled from "styled-components";
import { theme } from "theme";

const ButtonWrapper = styled.button`
  padding: ${({ small }) => (small ? "5px 8px" : "7px 15px")};
  border-radius: 5px;
  background-color: rgba(113, 113, 113, 0.48);
  color: #fff;
  font-size: ${({ small }) => (small ? "12px" : "16px")};
  font-weight: bold;
  outline: none;
  border: 2px solid transparent;
  transition: all 220ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: transparent;
    border: 2px solid ${theme.primary};
  }
`;

export function Button(props) {
    return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
}
