import React, { Component } from "react";
import styled from "styled-components";
import { LoginSection } from "./loginSection";

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export function LoginPage(props) {
  return (
    <PageContainer>
      <LoginSection />
    </PageContainer>
  );
}
