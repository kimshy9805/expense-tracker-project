import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import BackGroundImg from "../../assets/pictures/company_team.jpg";

export const HomePageContainer = styled.div`
  width: 100%;
  /* height: 100vh; means the height of this element is equal to 100% of the viewport height. */
  height: 100vh;
  background-image: url(${BackGroundImg});
  padding: 0;
  background-size: cover;
  position: relative;
  /* display: flex; */
  /* flex-direction: column; */
`;

//background filter
export const BackGroundFilter = styled.div`
  width: 100%;
  height: 100vh;
  overflow: auto;
  background-color: rgba(53, 53, 53, 0.5);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/*
    second navbar related
*/
export const SecondNavbar = styled.div`
  width: 100%;
  min-height: 100px;
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

export const MonthWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled(FontAwesomeIcon)`
  
`;

export const SecondNavbarText = styled.h1`
  /* ${({ small }) => (small ? "5px 8px" : "7px 15px")}; */
  color: #fff;
  margin: 0;
  font-size: ${({ small }) => (small ? "13px" : "25px")};
  /* font-size: 25px; */
  font-weight: regular;
  line-height: 1.5;
`;

/*  
    Filter view container related
*/
export const FilterViewContainer = styled.div`
  width: 100%;
  min-height: 30px;
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
  min-height: 50px;
  padding: 0 10em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/*
  Expense Container related
*/
export const ExpenseContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 0 10em;
  display: flex;
  flex-direction: column;
`;

//ExpenseWrapper
export const ExpenseWrapper = styled.div`
  width: 100%;
  min-height: 12%;
  background-color: rgba(113, 113, 113, 0.48);
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

//DateWrapper
export const DateWrapper = styled.div`
  width: 40%;
  height: 100%;
  padding: 1em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//merchantWrapper
export const MerchantWrapper = styled.div`
  width: 130%;
  height: 100%;
  padding: 1em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 20px;
`;

//amountWrapper
export const AmountWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 1em 0em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//categoryWrapper
export const CategoryWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 1em 0em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//descriptionWrapper
export const DescriptionWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1em 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

//Content text
export const TextWrapper = styled.h3`
  color: #fff;
  margin: 0;
  font-size: 15px;
  font-weight: regular;
  line-height: 1.5;
`;
