import React, { Component } from "react";
import styled from "styled-components";
import { RegistrationSection } from "./registrationSection";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function RegistrationPage(props) {
  return (
    <PageContainer>
      <RegistrationSection />
    </PageContainer>
  );
}
