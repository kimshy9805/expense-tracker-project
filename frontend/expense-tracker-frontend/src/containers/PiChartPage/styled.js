import styled from "styled-components";
import React, { Component } from "react";

export const SectionContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    overflow: scroll;
    height: 100vh;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

export const ButtonContainer = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: flex-end;
    margin-right: 10%;
`;

export const PiChartContainer = styled.div`
    width: 50%;
    height: 70%;
    position: fixed;
    left: 0;
    /* border: 2px solid yellow; */
`;

export const SummaryContainer = styled.div`
    width: 50%;
    height: 80%;
    /* border: 2px solid yellow; */
    display: flex;
    flex-direction: column;
    padding-left: 50px;
    margin-bottom: 60px;
`;

// export const CategoryWrapper = styled.div`
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: space-around;
// `;

export const TextWrapper = styled.h3`
    color: #fff;
    /* margin: 0; */
    font-size: ${({ small }) => (small ? "20px" : "40px")};
    /* font-weight: regular; */
    font-weight: 400;
    line-height: 1.5;
`;

export const TableContainer = styled.table`
    border-spacing: 0 4;
`;

export const TableHeaderContainer = styled.thead`
    margin-right: 50px;
`;
