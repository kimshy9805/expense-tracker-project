import React, { Component } from "react";
import styled from "styled-components";
import { PiChartSection } from "./piChartSection";

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const PiChartPage = () => {
  return (
    <PageContainer>
      <PiChartSection />
    </PageContainer>
  );
};
