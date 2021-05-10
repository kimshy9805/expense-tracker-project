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
import {
    ButtonContainer,
    PiChartContainer,
    SectionContainer,
    SummaryContainer,
    TableContainer,
    TableHeaderContainer,
    TextWrapper,
    TitleContainer,
} from "./styled";
import { Line } from "components/line";
import { Marginer } from "components/marginer";
import { number } from "yup/lib/locale";
import { Link } from "react-router-dom";
import { Button } from "components/button";

const stateSelector = createSelector(
    [makeSelectAccounts, makeSelectTokens],
    (account, token) => ({ account, token })
);

export const PiChartSection = (props) => {
    const token = useSelector(stateSelector);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryType, setCategoryType] = useState([]);
    const [categoryAmount, setCategoryAmount] = useState([]);
    const category = {
        categories: [
            { id: 1, category: "FEES", amount: 700, numberOfExpenses: 4 },
            { id: 2, category: "FEES", amount: 500, numberOfExpenses: 4 },
            {
                id: 3,
                category: "Advertising",
                amount: 200,
                numberOfExpenses: 4,
            },
            { id: 4, category: "Cars", amount: 1000, numberOfExpenses: 4 },
        ],
    };
    let tokenBearer = {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zaHk1ODQwQG5hdmVyLmNvbSIsImV4cCI6MTYyMDY4NjA5NCwiaWF0IjoxNjIwNjUwMDk0fQ.02yHwmXB2QVFLTps-SqoUwC5oT0KMgGHMuUpTsrPB24",
    };
    const month = new Date().getMonth();

    const getPiData = async (month) => {
        const response = await Axios.get(`/expenses/pi/${month}`, {
            headers: tokenBearer,
        }).catch((err) => {
            console.log(err);
        });
        if (response) {
            let data = [];
            let totalAmount = [];
            Object.values(response.data).map((ins) => {
                const { amount, numberOfExpenses } = ins;
                data = [...data, ins];
                totalAmount = [...totalAmount, amount];
            });
            setCategoryType(Object.keys(response.data));
            setCategoryData(data);
            setCategoryAmount(totalAmount);
        }
    };

    useEffect(() => {
        getPiData(month);
    }, []);

    const state = {
        labels: [...categoryType],
        datasets: [
            {
                label: "ExpenseCategory",
                backgroundColor: [
                    "#B21F00",
                    "#C9DE00",
                    "#2FDE00",
                    "#00A6B4",
                    "#6800B4",
                    "#001f3f",
                    "#0074D9",
                    "#7FDBFF",
                    "#39CCCC",
                    "#3D9970",
                    "#2ECC40",
                    "#01FF70",
                    "#FFDC00",
                    "#FF851B",
                    "#FF4136",
                    "#85144b",
                    "#F012BE",
                    "#B10DC9",
                ],
                hoverBackgroundColor: [
                    "#501800",
                    "#4B5000",
                    "#175000",
                    "#003350",
                    "#35014F",
                    "#501800",
                    "#4B5000",
                    "#175000",
                    "#003350",
                    "#35014F",
                    "#501800",
                    "#4B5000",
                    "#175000",
                    "#003350",
                    "#35014F",
                    "#501800",
                    "#4B5000",
                    "#175000",
                ],
                data: categoryAmount,
            },
        ],
    };
    const isEmptyCategory =
        !categoryType || (categoryType && categoryType.length === 0);

    const renderTableHeader = () => {
        let header = Object.keys(category.categories[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase}</th>;
        });
    };

    const renderTableData = () => {
        return categoryData.map((data, index) => {
            const { category, amount, numberOfExpenses } = data;
            return (
                <tr key={index}>
                    <td>
                        <TextWrapper small>{index}</TextWrapper>
                    </td>
                    <td>
                        <TextWrapper small>{category}</TextWrapper>
                    </td>
                    <td>
                        <TextWrapper small>{amount}</TextWrapper>
                    </td>
                    <td>
                        <TextWrapper small>{numberOfExpenses}</TextWrapper>
                    </td>
                </tr>
            );
        });
    };

    return (
        <FrontSectionContainer>
            <BackGroundFilter>
                <Navbar page="piChartPage" />
                <Marginer direction="vertical" margin="2em" />
                <TextWrapper>Pi Chart Analysis</TextWrapper>
                <ButtonContainer>
                    <Link
                        to={{
                            pathname: "/home",
                        }}
                    >
                        <Button>Summary</Button>
                    </Link>
                </ButtonContainer>
                <SectionContainer>
                    <PiChartContainer>
                        <Pie
                            type="pie"
                            data={state}
                            height={300}
                            width={300}
                            options={{
                                title: {
                                    display: true,
                                    text: "Average Rainfall per month",
                                    fontSize: 30,
                                },
                                legend: {
                                    display: true,
                                    position: "right",
                                },
                                maintainAspectRatio: false,
                            }}
                        />
                    </PiChartContainer>
                    <SummaryContainer>
                        <TableContainer>
                            {/* <thead> */}
                            <TableHeaderContainer>
                                <tr>
                                    <th align="left">
                                        <TextWrapper small>ID</TextWrapper>
                                    </th>
                                    <th align="left">
                                        <TextWrapper small>
                                            Category
                                        </TextWrapper>
                                    </th>
                                    <th align="left">
                                        <TextWrapper small>TOTAL</TextWrapper>
                                    </th>
                                    <th align="left">
                                        <TextWrapper small>
                                            # OF EXPENSES
                                        </TextWrapper>
                                    </th>
                                </tr>
                            </TableHeaderContainer>
                            {/* </thead> */}
                            <tbody>
                                {/* <tr>{renderTableHeader()}</tr> */}
                                <Marginer direction="vertical" margin="10px" />
                                {renderTableData()}
                            </tbody>
                        </TableContainer>
                    </SummaryContainer>
                </SectionContainer>
            </BackGroundFilter>
        </FrontSectionContainer>
    );
};
