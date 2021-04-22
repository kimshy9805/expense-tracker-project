import React, { Component, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { makeSelectProducts, makeSelectUsers } from "./selectors";
import { useSelector } from "react-redux";
import Axios from "../../http-common";
import * as Style from "./styled";
import { Navbar } from "components/navbar";
import { Marginer } from "components/marginer";
import { Button } from "components/button";
import { Expense } from "./Expense";

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
  const [expense, setExpense] = useState({});
  const [month, setMonth] = useState(monthNames[monthNumber]);
  const [account, setAccount] = useState("");
  const [popup, setPopup] = useState(false);

  //get
  const getExpense = async () => {
    const response = await Axios.get("/expenses").catch((err) =>
      console.log(err)
    );
    if (response && response.data) {
      setExpenses(response.data);
    }
  };

  //post
  const postExpense = async () => {
    const response = await Axios.post("/expenses", expense).catch((err) => {
      console.log(response.data);
      if (response && response.data) {
        getExpense();
      }
    });
  };

  //delete
  const deleteExpense = async (id) => {
    const response = await Axios.delete(`/expenses/${id}`).catch((err) => {
      console.log(response.data);
      if (response) {
        getExpense();
      }
    });
  };

  useEffect(() => {
    getExpense();
  }, []);

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const TogglePopup = () => {
    console.log("popup!");
    setPopup(!popup);
  };

  const isEmptyUser = !expenses || (expenses && expenses.length === 0);
  if (isEmptyUser) return null;

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
          <Button onClick={TogglePopup}>New expense</Button>
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
        <h3>Add expense here</h3>
        <form onSubmit={postExpense}>
          <label htmlFor="merchant">Merchant</label>
          <input
            name="merchant"
            placeholder="Merchant Name"
            onChange={handleChange}
          />
          <label htmlFor="date">Date</label>
          <input name="date" placeholder="2021-04-22" onChange={handleChange} />
          <label htmlFor="amount">Amount</label>
          <input name="amount" onChange={handleChange} />
          <label htmlFor="exchangeType">ExchangeType</label>
          <input name="exchangeType" onChange={handleChange} />
          <label htmlFor="category">Category</label>
          <input name="category" onChange={handleChange} />
          <label htmlFor="description">Description</label>
          <input name="description" onChange={handleChange} />
          <button type="submit">ADD</button>
        </form>
      </Style.BackGroundFilter>
    </Style.HomePageContainer>
  );
}
