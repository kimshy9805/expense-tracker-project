import React, { Component } from "react";
import { createSelector } from "reselect";
import { makeSelectProducts, makeSelectUsers } from "./selectors";
import { useSelector } from "react-redux";
import styled from "styled-components";
import * as Style from "./styled";
import { Navbar } from "components/navbar";
import { Marginer } from "components/marginer";
import { Button } from "components/button";
import { Line } from "components/line";

const stateSelector = createSelector(
  [makeSelectUsers, makeSelectProducts],
  (expenses, product) => ({ expenses, product })
);

export function HomeSection(props) {
  const { expenses, product } = useSelector(stateSelector);

  const isEmptyUser = !expenses || (expenses && expenses.length === 0);
  if (isEmptyUser) return null;

  console.log(typeof expenses);
  return (
    <Style.HomePageContainer>
      <Style.BackGroundFilter>
        <Navbar />
        <Marginer direction="vertical" margin="3em" />
        <Style.SecondNavbar>
          <Button>AccountInfo</Button>
          <Button>April</Button>
          <Button>New Expenses</Button>
        </Style.SecondNavbar>
        <Marginer direction="vertical" margin="1em" />
        <Line />
        <Marginer direction="vertical" margin="1em" />
        <Style.FilterViewContainer>
          <Button>Show Filters</Button>
          <Button>View</Button>
        </Style.FilterViewContainer>
        <Marginer direction="vertical" margin="1em" />
        <Style.ExpenseDetailContainer>
          <Button small>Checkout</Button>
          <Button small>Merchant</Button>
          <Button small>Amount</Button>
          <Button small>Category</Button>
          <Button small>Description</Button>
        </Style.ExpenseDetailContainer>
        <Marginer direction="vertical" margin="10px" />
        <Style.ExpenseContainer>
          {expenses.map((expense, idx) => (
            <Style.ExpenseContainer key={idx}>
              {Object.keys(expense).map((key) => expense[key])}
            </Style.ExpenseContainer>
          ))}
        </Style.ExpenseContainer>
      </Style.BackGroundFilter>
    </Style.HomePageContainer>
  );
}
