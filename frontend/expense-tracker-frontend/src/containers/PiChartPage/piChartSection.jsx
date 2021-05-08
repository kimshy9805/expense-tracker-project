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
    PiChartContainer,
    SectionContainer,
    SummaryContainer,
    TextWrapper,
} from "./styled";
import { Line } from "components/line";
import { Marginer } from "components/marginer";

const stateSelector = createSelector(
    [makeSelectAccounts, makeSelectTokens],
    (account, token) => ({ account, token })
);

export const PiChartSection = (props) => {
    const token = useSelector(stateSelector);
    const [categoryData, setCategoryData] = useState([]);
    const [categoryType, setCategoryType] = useState([]);
    let tokenBearer = {
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraW1zaHk1ODQwQG5hdmVyLmNvbSIsImV4cCI6MTYyMDUxNTQ2NCwiaWF0IjoxNjIwNDc5NDY0fQ.0f0X7JnvCPW4Dl2CaKUEMW4LLr88n2J0K0GO2fVddcU",
    };
    const month = new Date().getMonth();

    const getPiData = async (month) => {
        console.log(tokenBearer);
        const response = await Axios.get(`/expenses/pi/${month}`, {
            headers: tokenBearer,
        }).catch((err) => {
            console.log(err);
        });

        if (response) {
            let data = [];
            Object.values(response.data).map((ins) => {
                data = [...data, ins.amount];
            });
            setCategoryType(Object.keys(response.data));
            setCategoryData(data);
            console.log(isEmptyCategory);
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
                data: [...categoryData],
            },
        ],
    };
    const isEmptyCategory =
        !categoryType || (categoryType && categoryType.length === 0);

    return (
        <FrontSectionContainer>
            <BackGroundFilter>
                <Navbar page="piChartPage" />
                <Marginer direction="vertical" margin="4em" />
                <TextWrapper>Pi Chart Analysis</TextWrapper>
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
                    <h1>hihihihihihi</h1>

                    <SummaryContainer>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <TextWrapper small>
                                            Category
                                        </TextWrapper>
                                    </th>
                                    <th>
                                        <TextWrapper small>TOTAL</TextWrapper>
                                    </th>
                                    <th>
                                        <TextWrapper small>
                                            # OF EXPENSES
                                        </TextWrapper>
                                    </th>
                                </tr>
                            </thead>
                            <Line />
                            <tbody>
                                {/* TODO find a way to populate data inside table  */}
                                {!isEmptyCategory &&
                                    categoryType.map((type) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <TextWrapper small>
                                                        {type}
                                                    </TextWrapper>
                                                </td>
                                                <td>
                                                    <h3>hi</h3>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </SummaryContainer>
                </SectionContainer>
            </BackGroundFilter>
        </FrontSectionContainer>
    );
};
