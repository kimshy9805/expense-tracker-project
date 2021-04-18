import styled from "styled-components";
import BackGroundImg from "../../assets/pictures/company_team.jpg";

export const HomePageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${BackGroundImg});
  padding: 0;
  background-size: cover;
  position: relative;
`;

//background filter
export const BackGroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(53, 53, 53, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/*
    second navbar related
*/
export const SecondNavbar = styled.div`
  width: 100%;
  height: 50px;
  padding: 0 53px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SecondNavbarText = styled.h1`
  color: #fff;
  margin: 0;
  font-size: 25px;
  font-weight: regular;
  line-height: 1.5;
`;

/*  
    Filter view container related
*/
export const FilterViewContainer = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 10em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

//filterWrapper
export const FilterWrapper = styled.div``;

//ViewWrapper
export const ViewWrapper = styled.div``;

//ExpenseDetail
export const ExpenseDetailContainer = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 10em;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

/*
  Expense Container related
*/
export const ExpenseContainer = styled.div`
  width: 78%;
  height: 100%;
  padding: 0 10em;
  display: flex;
  flex-direction: column;
  background-color: #fff;
`;

//ExpenseWrapper
export const ExpenseWrapper = styled.div``;

//merchantWrapper
export const MerchantWrapper = styled.div``;

//amountWrapper
export const AmountWrapper = styled.div``;

//categoryWrapper
export const CategoryWrapper = styled.div``;

//descriptionWrapper
export const descriptionWrapper = styled.div``;
