import React, { Component, useEffect, useState } from "react";
import styled from "styled-components";

const PopUpWrapper = styled.div`
  position: fixed;
  background: #00000050;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;

const PopUpBox = styled.div`
  position: relative;
  width: 70%;
  /* auto to horizontally center the element within its container. */
  margin: 0 auto;
  max-height: 70vh;
  margin-top: calc(100vh - 85vh - 20px);
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #999;
`;

const CloseIcon = styled.span`
  content: "x";
  cursor: pointer;
  position: fixed;
  right: calc(15% - 30px);
  top: calc(100vh - 85vh - 33px);
  background: #ededed;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  line-height: 20px;
  text-align: center;
  border: 1px solid #999;
  font-size: 20px;
`;

const ExpenseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 2em;
  align-items: center;
`;

export const AddExpenseForm = (props) => {
  const initialState = {
    date: "",
    merchant: "",
    amount: 0,
    exchangeType: "",
    category: "",
    description: "",
  };
  const [expense, setExpense] = useState(initialState);
  const { onAdd, handleClose } = props;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  //onSubmit ={onAdd(expense)} 하면 무한 rendering... 저런식으로 조건을 걸어줘야함.
  return (
    <PopUpWrapper>
      <PopUpBox>
        <CloseIcon
          onClick={() => {
            handleClose();
          }}
        >
          x
        </CloseIcon>
        <ExpenseWrapper>
          <h3>Add Expense here</h3>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (!expense.date || !expense.merchant) return;
              onAdd(expense);
              setExpense(initialState);
            }}
          >
            <label htmlFor="merchant">Merchant</label>
            <input
              name="merchant"
              placeholder="Merchant Name"
              onChange={handleInputChange}
            />
            <label htmlFor="date">Date</label>
            <input
              name="date"
              placeholder="2021-04-22"
              onChange={handleInputChange}
            />
            <label htmlFor="amount">Amount</label>
            <input name="amount" onChange={handleInputChange} />
            <label htmlFor="exchangeType">ExchangeType</label>
            <input name="exchangeType" onChange={handleInputChange} />
            <label htmlFor="category">Category</label>
            <input name="category" onChange={handleInputChange} />
            <label htmlFor="description">Description</label>
            <input name="description" onChange={handleInputChange} />
            <button
              type="submit"
              onClick={() => {
                handleClose();
              }}
            >
              ADD
            </button>
          </form>
        </ExpenseWrapper>
      </PopUpBox>
    </PopUpWrapper>
  );
};
