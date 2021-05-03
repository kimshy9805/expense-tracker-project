import { AccountBox } from "components/accountBox";
import React, { Component } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function LoginPage(props) {
  return (
    <PageContainer>
      <AccountBox />
    </PageContainer>
  );
}
