import { Button } from "components/button";
import React, { Component } from "react";
import {
  AmountWrapper,
  CategoryWrapper,
  DateWrapper,
  DescriptionWrapper,
  ExpenseContainer,
  ExpenseWrapper,
  MerchantWrapper,
  TextWrapper,
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
  } = props;
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
      <Button small onClick={() => onDelete(id)}>
        remove
      </Button>
    </ExpenseWrapper>
  );
};
