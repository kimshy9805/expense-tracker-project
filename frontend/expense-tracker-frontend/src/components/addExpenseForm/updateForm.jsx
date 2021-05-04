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
  // currency: yup.string().required(),
  // category: yup.string().required(),
  // description: yup.string(),
});

export const UpdateForm = (props) => {
  const { expense, onUpdate, handleClose } = props;

  //Todo onUpdate 만해결하면 될듯?
  const onSubmit = async (values) => {
    console.log(values);
    onUpdate(values);
  };

  const formik = useFormik({
    initialValues: expense,
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
