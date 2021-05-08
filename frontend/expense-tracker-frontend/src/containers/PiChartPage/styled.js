import styled from "styled-components";
import React, { Component } from "react";

export const SectionContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    height: 100vh;
    border: 2px solid #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const PiChartContainer = styled.div`
    width: 50%;
    height: 70%;
    position: fixed;
    left: 0;
    border: 2px solid yellow;
`;

export const SummaryContainer = styled.div`
    width: 50%;
    height: 80%;
    border: 2px solid yellow;
    display: flex;
    flex-direction: column;
    padding-left: 50px;
`;

export const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const TextWrapper = styled.h3`
    color: #fff;
    margin: 0;
    font-size: ${({ small }) => (small ? "20px" : "40px")};
    /* font-weight: regular; */
    font-weight: 400;
    line-height: 1.5;
`;

// export function CategoryText(props) {
//     return <TextWrapper {...props}>{props.childeren}</TextWrapper>;
// }

// const ButtonWrapper = styled.button`
//     padding: ${({ small }) => (small ? "5px 8px" : "7px 15px")};
//     border-radius: 5px;
//     background-color: rgba(113, 113, 113, 0.48);
//     color: #fff;
//     font-size: ${({ small }) => (small ? "12px" : "16px")};
//     font-weight: bold;
//     outline: none;
//     border: 2px solid transparent;
//     transition: all 220ms ease-in-out;
//     cursor: pointer;

//     &:hover {
//         background-color: transparent;
//         border: 2px solid ${theme.primary};
//     }
// `;

// export function Button(props) {
//     return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
// }
