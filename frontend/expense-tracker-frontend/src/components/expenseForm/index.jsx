import { Marginer } from "components/marginer";
import React, { Component, useState } from "react";
import styled from "styled-components";
import { FormikContext, useFormik } from "formik";
import * as yup from "yup";
import {
  BoxContainer,
  ButtonWrapper,
  CloseIcon,
  FieldContainer,
  FormContainer,
  Input,
  PopupContainer,
  SubmitButton,
  TextWrapper,
} from "./common";

const validationSchema = yup.object({
  merchant: yup.string().required(),
  // date: yup.string().required(),
  // total: yup.number().required(),
  // exchangeType: yup.string().required(),
  // category: yup.string().required(),
  // description: yup.string(),
});

export const AddForm = (props) => {
  const initialState = {
    date: "",
    merchant: "",
    amount: 0,
    exchangeType: "",
    category: "",
    description: "",
  };
  const { onAdd, handleClose } = props;

  const onSubmit = async (values) => {
    console.log(values);
    onAdd(values);
  };

  const formik = useFormik({
    initialValues: initialState,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <BoxContainer>
      <PopupContainer>
        <CloseIcon
          onClick={() => {
            handleClose();
          }}
        >
          x
        </CloseIcon>
        <FormContainer onSubmit={formik.handleSubmit}>
          <FieldContainer>
            <TextWrapper>Merchant:</TextWrapper>
            <Marginer direction="horizontal" margin="20px" />
            <Input
              name="merchant"
              placeholder="Merchant"
              onChange={formik.handleChange}
              value={formik.values.merchant}
              type="merchant"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <FieldContainer>
            <TextWrapper>Date:</TextWrapper>
            <Marginer direction="horizontal" margin="20px" />
            <Input
              name="date"
              placeholder="2021-05-01"
              onChange={formik.handleChange}
              value={formik.values.date}
              type="date"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <FieldContainer>
            <TextWrapper>Total:</TextWrapper>
            <Marginer direction="horizontal" margin="20px" />
            <Input
              name="amount"
              placeholder="Enter amount"
              onChange={formik.handleChange}
              value={formik.values.amount}
              type="amount"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <FieldContainer>
            <Input
              name="exchangeType"
              placeholder="SGD"
              onChange={formik.handleChange}
              value={formik.values.exchangeType}
              type="exchangeType"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <FieldContainer>
            <TextWrapper>Category:</TextWrapper>
            <Marginer direction="horizontal" margin="20px" />
            <Input
              name="category"
              placeholder="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              type="category"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <FieldContainer>
            <TextWrapper>Description:</TextWrapper>
            <Marginer direction="horizontal" margin="20px" />
            <Input
              name="description"
              placeholder="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              type="description"
              onBlur={formik.handleBlur}
            />
          </FieldContainer>
          <Marginer direction="vertical" margin="2em" />
          <ButtonWrapper>
            <SubmitButton type="submit">Save</SubmitButton>
          </ButtonWrapper>
        </FormContainer>
      </PopupContainer>
    </BoxContainer>
  );
};

// import React, { Component, useEffect, useState } from "react";
// import styled from "styled-components";
// import { AddForm } from "./addForm";

// const PopUpWrapper = styled.div`
//   position: fixed;
//   background: #00000050;
//   width: 100%;
//   height: 100vh;
//   top: 0;
//   left: 0;
// `;

// const PopUpBox = styled.div`
//   position: relative;
//   width: 70%;
//   /* auto to horizontally center the element within its container. */
//   margin: 0 auto;
//   max-height: 70vh;
//   margin-top: calc(100vh - 85vh - 20px);
//   padding: 20px;
//   background: #fff;
//   border-radius: 4px;
//   border: 1px solid #999;
// `;

// const CloseIcon = styled.span`
//   content: "x";
//   cursor: pointer;
//   position: fixed;
//   right: calc(15% - 30px);
//   top: calc(100vh - 85vh - 33px);
//   background: #ededed;
//   width: 25px;
//   height: 25px;
//   border-radius: 50%;
//   line-height: 20px;
//   text-align: center;
//   border: 1px solid #999;
//   font-size: 20px;
// `;

// const ExpenseWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 1em 2em;
//   align-items: center;
// `;

// //TODO formik 으로 바꾸기?
// export const AddExpenseForm = (props) => {
//   const initialState = {
//     date: "",
//     merchant: "",
//     amount: 0,
//     exchangeType: "",
//     category: "",
//     description: "",
//   };
//   const [expense, setExpense] = useState(initialState);
//   const { onAdd, handleClose } = props;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setExpense({ ...expense, [name]: value });
//   };

//   const handleOnSubmit = (e) => {
//     e.preventDefault();
//     if (!expense.date || !expense.merchant) return;
//     onAdd(expense);
//     setExpense(initialState);
//   };

//   //onSubmit ={onAdd(expense)} 하면 무한 rendering... 저런식으로 조건을 걸어줘야함.
//   return (
//     <AddForm onAdd handleClose></AddForm>
//     // <PopUpWrapper>
//     // <PopUpBox>
//     /* <CloseIcon
//           onClick={() => {
//             handleClose();
//           }}
//         >
//           x
//         </CloseIcon>
//         <ExpenseWrapper>
//           <h3>Add Expense here</h3>
//           <form onSubmit={handleOnSubmit}>
//             <label htmlFor="merchant">Merchant</label>
//             <input
//               name="merchant"
//               placeholder="Merchant Name"
//               onChange={handleInputChange}
//             />
//             <label htmlFor="date">Date</label>
//             <input
//               name="date"
//               placeholder="2021-04-22"
//               onChange={handleInputChange}
//             />
//             <label htmlFor="amount">Amount</label>
//             <input name="amount" onChange={handleInputChange} />
//             <label htmlFor="exchangeType">ExchangeType</label>
//             <input name="exchangeType" onChange={handleInputChange} />
//             <label htmlFor="category">Category</label>
//             <input name="category" onChange={handleInputChange} />
//             <label htmlFor="description">Description</label>
//             <input name="description" onChange={handleInputChange} />
//             <button type="submit">ADD</button>
//           </form>
//         </ExpenseWrapper> */
//     // </PopUpBox>
//     // </PopUpWrapper>
//   );
// };
