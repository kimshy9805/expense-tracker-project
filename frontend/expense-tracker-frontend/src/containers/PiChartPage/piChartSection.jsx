import {
  BackGroundFilter,
  FrontSectionContainer,
} from "containers/FrontPage/styled";
import { Navbar } from "../../components/navbar";
import React, { Component, useEffect, useState } from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import Axios from "../../services/http-common";
import { createSelector } from "reselect";
import { makeSelectAccounts, makeSelectTokens } from "services/selectors";
import { useSelector } from "react-redux";

const stateSelector = createSelector(
  [makeSelectAccounts, makeSelectTokens],
  (account, token) => ({ account, token })
);

export const PiChartSection = (props) => {
  const token = useSelector(stateSelector);
  const [categorydata, setCategoryData] = useState({});
  const tokenBearer = `Bearer ${token}`;
  const month = new Date().getMonth();

  //data의 형식
  //advertise: ~~
  //Fees: ~~ 
  const getPiData = async (month) => {
    const response = await Axios.get(`/expenses/pi/${month}`, {
      headers: tokenBearer,
    }).catch((err) => console.log(err));

    if (response) {
      console.log(response);
      setCategoryData(response.data);
    }
  };

  useEffect(() => {
    console.log(token);
    getPiData(month);
  }, []);
  //TODO after properly receive data from backend
  const state = {
    // category,
    labels: [
      "Advertising",
      "Benefits",
      "Car",
      "Equipment",
      "Fees",
      "Home Office",
      "Insurance",
      "Labor",
      "Maintenance",
      "Materials",
      "Meals and Entertainment",
      "Office Supplies",
      "Other",
      "Professional Services",
      "Rent",
      "Taxes",
      "Travel",
      "Utilities",
    ],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: [65, 59, 80, 81, categorydata.rent],
      },
    ],
  };

  return (
    <FrontSectionContainer>
      <BackGroundFilter>
        <Navbar page="piChartPage" />
        <div>
          <Pie
            type="pie"
            data={state}
            height={300}
            width={300}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </BackGroundFilter>
    </FrontSectionContainer>
  );
};
