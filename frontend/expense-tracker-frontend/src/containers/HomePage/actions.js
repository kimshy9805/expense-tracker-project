import { ActionTypes } from "./constants";

//action -> type, payload
//setUsers = arrow function.
/**
 * @param {any} expenses
 */
//ActionTypes는 object이고 enum사용한다고 생각하면됨.
//payload는 users. users 는 empty array였음.

export const setExpenses = (expenses) => ({
  type: ActionTypes.SET_EXPENSES,
  payload: expenses,
});

export const setProduct = (product) => ({
  tyoe: ActionTypes.SET_PRODUCT,
  payload: product,
});
