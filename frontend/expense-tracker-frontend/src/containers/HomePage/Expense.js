import { UpdateForm } from "components/expenseForm/updateForm";
import { Button } from "components/button";
import { Marginer } from "components/marginer";
import React, { Component, useState } from "react";
import {
  AmountWrapper,
  CategoryWrapper,
  DateWrapper,
  DescriptionWrapper,
  ExpenseContainer,
  ExpenseWrapper,
  MerchantWrapper,
  TextWrapper,
  ButtonWrapper,
} from "./styled";

export const Expense = (props) => {
  //이런식으로 할때는 props안에 attributes를 하나하나씩 나열해서 사용해야함.
  //or props.id
  const {
    id,
    date,
    merchant,
    amount,
    exchangeType,
    category,
    description,
    onDelete,
    onUpdate,
  } = props;
  const [isPopup, setIsPopup] = useState(false);
  const expense = {
    id: id,
    date: date,
    merchant: merchant,
    amount: amount,
    exchangeType: exchangeType,
    category: category,
    description: description,
  };
  const toggleIsPopup = () => {
    console.log("popup change!");
    setIsPopup(!isPopup);
  };

  const onUpdateTemp = (expense) => {
    console.log(expense);
  };

  return (
    <ExpenseWrapper>
      <DateWrapper>
        <TextWrapper>{date}</TextWrapper>
      </DateWrapper>
      <MerchantWrapper>
        <TextWrapper>{merchant}</TextWrapper>
      </MerchantWrapper>
      <AmountWrapper>
        <TextWrapper>{amount}</TextWrapper>
        <TextWrapper>{exchangeType}</TextWrapper>
      </AmountWrapper>
      <CategoryWrapper>
        <TextWrapper>{category}</TextWrapper>
      </CategoryWrapper>
      <DescriptionWrapper>
        <TextWrapper>{description}</TextWrapper>
      </DescriptionWrapper>
      <ButtonWrapper>
        <Button small onClick={() => onDelete(id)}>
          remove
        </Button>
        <Marginer direction="vertical" margin="5px" />
        <Button
          small
          onClick={() => {
            toggleIsPopup();
          }}
        >
          update
        </Button>
      </ButtonWrapper>
      {isPopup && (
        <UpdateForm
          expense={expense}
          // onUpdate={onUpdateTemp}
          onUpdate={onUpdate}
          handleClose={toggleIsPopup}
        />
      )}
    </ExpenseWrapper>
  );
};

//OnClick 시 addForm만들기
//function을 그대로 child component한데 pass 가능하다. 
//onUpdate처럼. 
