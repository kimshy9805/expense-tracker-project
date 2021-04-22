import React, { Component, useEffect } from "react";
import { createSelector } from "reselect";
import { makeSelectProducts, makeSelectUsers } from "./selectors";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setExpenses, setProduct } from "./actions";
import { HomeSection } from "./homeSection";

const DEFAULT_PAGE_URL =
  "http://localhost:8080/api/v1/expense-tracker/expenses";

const stateSelector = createSelector(
  [makeSelectUsers, makeSelectProducts],
  (expenses, product) => ({ expenses, product })
);

const actionDispatch = (dispatch) => ({
  setExpenses: (expenses) => dispatch(setExpenses(expenses)),
  // setProduct: (product) => dispatch(setProduct(product)),
});

export function HomePage(props) {
  const { expenses, product } = useSelector(stateSelector);
  const { setExpenses, setProduct } = actionDispatch(useDispatch());

  const fetchUsers = async () => {
    const response = await axios.get(DEFAULT_PAGE_URL).catch((err) => {
      console.log("err", err);
    });
    // console.log(response.data.map((exp, idk) => exp.merchant));
    setExpenses(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <HomeSection />
    </div>
  );
}
