import React, { Component } from "react";
import styled from "styled-components";
import { FrontSection } from "./frontSection";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export function FrontPage(props) {
  return (
    <PageContainer>
      <FrontSection />
    </PageContainer>
  );
}
