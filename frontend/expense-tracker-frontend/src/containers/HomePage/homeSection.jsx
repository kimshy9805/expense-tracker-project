import React, { Component, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { makeSelectProducts, makeSelectUsers } from "./selectors";
import { useSelector } from "react-redux";
import axiosInstanceInstance from "../../services/InterceptorService";
import * as Style from "./styled";
import { Navbar } from "components/navbar";
import { Marginer } from "components/marginer";
import { Button } from "components/button";
import { Expense } from "./Expense";
import { AddExpenseForm } from "components/addExpenseForm";
import { AuthHeader } from "services/AuthHeaderService";
import axiosInstance from "../../services/InterceptorService";

const stateSelector = createSelector(
  [makeSelectUsers, makeSelectProducts],
  (expenseRedux, product) => ({ expenseRedux, product })
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
  const { expenseRedux, product } = useSelector(stateSelector);
  const [expenses, setExpenses] = useState([]);
  // const [expense, setExpense] = useState({});
  const [month, setMonth] = useState(monthNames[monthNumber]);
  const [account, setAccount] = useState("");
  const [isPopup, setIsPopup] = useState(false);

  //get
  const getExpense = async () => {
    const response = await axiosInstance
      .get("/expenses/getAll")
      .catch((err) => console.log(err));
    if (response && response.data) {
      setExpenses(response.data);
    }
  };

  //post
  const postExpense = async (expense) => {
    const response = await axiosInstance
      .post("/expenses", expense)
      .catch((err) => {
        console.log(err);
      });
    if (response && response.data) {
      setExpenses([...expenses, expense]);
    }
  };

  //delete
  const deleteExpense = async (id) => {
    const response = await axiosInstance
      .delete(`/expenses/${id}`)
      .catch((err) => {
        console.log(err);
      });
    if (response) {
      setExpenses(expenses.filter((exp) => exp.id != id));
    }
  };

  useEffect(() => {
    getExpense();
  }, []);

  // const handleChange = (e) => {
  //   setExpense({ ...expense, [e.target.name]: e.target.value });
  // };

  const toggleIsPopup = () => {
    console.log("popup change!");
    setIsPopup(!isPopup);
  };

  const isEmptyUser = !expenses || (expenses && expenses.length === 0);

  return (
    <Style.HomePageContainer>
      <Style.BackGroundFilter>
        <Navbar />
        <Marginer direction="vertical" margin="3em" />
        <Style.SecondNavbar>
          <Style.AccountWrapper>
            <Style.SecondNavbarText>Account</Style.SecondNavbarText>
            <Style.SecondNavbarText>{account}</Style.SecondNavbarText>
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
        {expenses.map((expense) => (
          <Expense key={expense.id} {...expense} onDelete={deleteExpense} />
        ))}
        <Marginer direction="vertical" margin="5em" />
        {isPopup && (
          <AddExpenseForm onAdd={postExpense} handleClose={toggleIsPopup} />
        )}
      </Style.BackGroundFilter>
    </Style.HomePageContainer>
  );
}
