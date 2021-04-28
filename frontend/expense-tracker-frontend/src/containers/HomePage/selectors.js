import { createSelector } from "reselect";

//5. selectors

//select and grab specific data from store.
//function. takes state and give state.homePage data.
const homePageState = (state) => state.homePage;

//immediately bind us with this homePage.users data
// provide with selectors.
//makeSelectUsers 는 바로 homePage.users에 bind시켜줌. 그래서 이걸로 data사용가능.
export const makeSelectUsers = createSelector(
  homePageState,
  (homePage) => homePage.expenses
);

//select는 한개만 된다. 이건 내 착각일수있음.
export const makeSelectProducts = createSelector(
  homePageState,
  (homePage) => homePage.product
);
