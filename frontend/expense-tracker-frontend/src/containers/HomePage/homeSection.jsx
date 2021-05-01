import React, { Component, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { makeSelectProducts, makeSelectUsers } from "./selectors";
import { makeSelectTokens } from "../../services/selectors";
import { useSelector } from "react-redux";
import * as Style from "./styled";
import { Navbar } from "components/navbar";
import { Marginer } from "components/marginer";
import { Button } from "components/button";
import { Expense } from "./Expense";
import { AddForm } from "components/addExpenseForm";
import axiosInstance from "services/axiosInstace";
import Axios from "../../http-common";

const stateSelector = createSelector(
  [makeSelectUsers, makeSelectProducts, makeSelectTokens],
  (expense, product, token) => ({ expense, product, token })
);

let monthNumber = new Date().getMonth();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HomeSection(props) {
  //attributes
  const { expense, product, token } = useSelector(stateSelector);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(monthNames[monthNumber]);
  const [isPopup, setIsPopup] = useState(false);
  let tokenBearer = { Authorization: `Bearer ${token}` };

  //get
  const getExpense = async () => {
    console.log("token from front ", token);
    const response = await Axios.get("expenses/getAll", {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });

    if (response && response.data) {
      setExpenses(response.data);
    }
  };

  //post
  const postExpense = async (expense) => {
    const response = await Axios.post("/expenses", expense, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });
    if (response && response.data) {
      setExpenses([...expenses, expense]);
    }
  };

  //delete
  const deleteExpense = async (id) => {
    const response = await Axios.delete(`/expenses/${id}`, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });
    if (response) {
      setExpenses(expenses.filter((exp) => exp.id != id));
    }
  };

  useEffect(() => {
    getExpense();
  }, []);

  const toggleIsPopup = () => {
    console.log("popup change!");
    setIsPopup(!isPopup);
  };

  const isEmptyUser = !expenses || (expenses && expenses.length === 0);

  return (
    <Style.HomePageContainer>
      <Style.BackGroundFilter>
        <Navbar />
        <Marginer direction="vertical" margin="2em" />
        <Style.SecondNavbar>
          <Style.AccountWrapper>
            <Style.SecondNavbarText>Account</Style.SecondNavbarText>
            <Style.SecondNavbarText>hi</Style.SecondNavbarText>
          </Style.AccountWrapper>
          <Style.SecondNavbarText>{month}</Style.SecondNavbarText>
          <Button onClick={toggleIsPopup}>New expense</Button>
        </Style.SecondNavbar>
        <Marginer direction="vertical" margin="1em" />
        <Marginer direction="vertical" margin="1em" />
        <Style.FilterViewContainer>
          <Button>Show Filters</Button>
          <Button>View</Button>
        </Style.FilterViewContainer>
        <Marginer direction="vertical" margin="1em" />
        <Style.ExpenseDetailContainer>
          <Button small>Date</Button>
          <Marginer direction="horizontal" margin="5em" />
          <Button small>Merchant</Button>
          <Marginer direction="horizontal" margin="20em" />
          <Button small>Amount</Button>
          <Marginer direction="horizontal" margin="5em" />
          <Button small>Category</Button>
          <Marginer direction="horizontal" margin="5em" />
          <Button small>Description</Button>
        </Style.ExpenseDetailContainer>
        <Marginer direction="vertical" margin="2em" />
        <Style.ExpenseContainer>
          {expenses.map((expense) => (
            <Expense
              onClick={() => {
                console.log("click!");
              }}
              key={expense.id}
              {...expense}
              onDelete={deleteExpense}
            />
          ))}
        </Style.ExpenseContainer>
        <Marginer direction="vertical" margin="5em" />
        {isPopup && <AddForm onAdd={postExpense} handleClose={toggleIsPopup} />}
      </Style.BackGroundFilter>
    </Style.HomePageContainer>
  );
}
