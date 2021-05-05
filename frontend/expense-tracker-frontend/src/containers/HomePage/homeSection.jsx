import React, { Component, useEffect, useState } from "react";
import { createSelector } from "reselect";
import { makeSelectTokens, makeSelectAccounts } from "../../services/selectors";
import { useSelector } from "react-redux";
import * as Style from "./styled";
import { Navbar } from "components/navbar";
import { Marginer } from "components/marginer";
import { Button } from "components/button";
import { Expense } from "./Expense";
import { AddForm } from "components/expenseForm";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axiosInstance from "services/axiosInstace";
import Axios from "../../services/http-common";

const stateSelector = createSelector(
  [makeSelectAccounts, makeSelectTokens],
  (account, token) => ({ account, token })
);

let monthNumber = new Date().getMonth();
let monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function HomeSection(props) {
  //attributes
  const { account, token } = useSelector(stateSelector);
  const [expenses, setExpenses] = useState([]);
  const [month, setMonth] = useState(monthNames[monthNumber]);
  const [isPopup, setIsPopup] = useState(false);
  const [count, setCount] = useState(0);

  let tokenBearer = { Authorization: `Bearer ${token}` };
  //get
  const getExpense = async (type) => {
    const response = await Axios.get("expenses/getAll", {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });

    if (response && response.data) {
      setExpenses(response.data);
    }
  };

  const getMonthlyExpense = async () => {
    const response = await Axios.get(`/expenses/month/${monthNumber}`, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });

    if (response) {
      setExpenses(response.data);
    }
  };

  const getSortExpense = async (sortType) => {
    let request = { type: sortType, month: monthNumber };
    console.log(request);
    switch (sortType) {
      case "merchant":
        {
          const response = await Axios.post("expenses/filter", request, {
            headers: tokenBearer,
          }).catch((err) => {
            console.log(err);
          });
          if (response) {
            console.log(response);
            setExpenses(response.data);
          }
        }
        break;
      case "date":
        {
          const response = await Axios.post("expenses/filter", request, {
            headers: tokenBearer,
          }).catch((err) => {
            console.log(err);
          });
          if (response) {
            console.log(response);
            setExpenses(response.data);
          }
        }
        break;
      case "amount": {
        const response = await Axios.post("expenses/filter", request, {
          headers: tokenBearer,
        }).catch((err) => {
          console.log(err);
        });
        if (response) {
          console.log(response);
          setExpenses(response.data);
        }
      }
      default:
        {
        }
        break;
    }
  };

  //post
  const postExpense = async (expense) => {
    const response = await Axios.post("/expenses", expense, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });
    if (response && response.data) {
      setExpenses([...expenses, expense]);
    }
  };

  //delete
  const deleteExpense = async (id) => {
    const response = await Axios.delete(`/expenses/${id}`, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });
    if (response) {
      setExpenses(expenses.filter((exp) => exp.id != id));
    }
  };

  //need entire expense not id.
  //Update
  const updateExpense = async (expense) => {
    console.log("update!");
    console.log(expense);

    const response = await Axios.put(`/expenses/${expense.id}`, expense, {
      headers: tokenBearer,
    }).catch((err) => {
      console.log(err);
    });

    if (response) {
      console.log(response);
      getMonthlyExpense();
    }
  };

  //useEffect takes two parameters 1. callback, 2. dependency array
  //dependency array = [] 라면 lifecycle마지막단계에서 한번만 부르고 끝
  //하지만 [monthNumber]처럼 변화가 생길때마다 useEffect를 부르게 할수있음. 아래처럼.
  //여러개의 dependency를 줄수도 있다는것. [monthNunber, expenses] => infinite loop why?
  useEffect(() => {
    getMonthlyExpense();
  }, [monthNumber]);

  useEffect(() => {
    getMonthlyExpense();
  }, [expenses.length]);

  const toggleIsPopup = () => {
    console.log("popup change!");
    setIsPopup(!isPopup);
  };

  const changeMonth = (direction) => {
    if (direction === "left") {
      if (monthNumber === 0) {
        monthNumber = 11;
      } else {
        monthNumber -= 1;
      }
    } else {
      if (monthNumber === 11) {
        monthNumber = 0;
      } else {
        monthNumber += 1;
      }
    }
    setMonth(monthNames[monthNumber]);
  };

  const isEmptyUser = !expenses || (expenses && expenses.length === 0);

  return (
    <Style.HomePageContainer>
      <Style.BackGroundFilter>
        <Navbar page="homePage" />
        <Marginer direction="vertical" margin="2em" />
        <Style.SecondNavbar>
          <Style.AccountWrapper>
            <Style.SecondNavbarText>Account</Style.SecondNavbarText>
            <Style.SecondNavbarText small>
              {account.email}
            </Style.SecondNavbarText>
          </Style.AccountWrapper>
          {}
          <Style.MonthWrapper>
            <FontAwesomeIcon
              onClick={() => {
                changeMonth("left");
              }}
              icon={faArrowLeft}
            />
            <Marginer direction="horizontal" margin="2em" />
            <Style.SecondNavbarText>{month}</Style.SecondNavbarText>
            <Marginer direction="horizontal" margin="2em" />
            <FontAwesomeIcon
              onClick={() => {
                changeMonth("right");
              }}
              icon={faArrowRight}
            />
          </Style.MonthWrapper>
          <Button onClick={toggleIsPopup}>New expense</Button>
        </Style.SecondNavbar>
        <Marginer direction="vertical" margin="1em" />
        <Marginer direction="vertical" margin="1em" />
        <Style.FilterViewContainer>
          <Button>Show Filters</Button>
          <Button>View</Button>
        </Style.FilterViewContainer>
        <Marginer direction="vertical" margin="1em" />
        <Style.ExpenseDetailContainer>
          <Button
            small
            onClick={() => {
              getSortExpense("date");
            }}
          >
            Date
          </Button>
          <Marginer direction="horizontal" margin="6em" />
          <Button
            small
            onClick={() => {
              getSortExpense("merchant");
            }}
          >
            Merchant
          </Button>
          <Marginer direction="horizontal" margin="18em" />
          <Button
            small
            onClick={() => {
              getSortExpense("amount");
            }}
          >
            Amount
          </Button>
          <Marginer direction="horizontal" margin="3.5em" />
          <Button small>Category</Button>
          <Marginer direction="horizontal" margin="4em" />
          <Button small>Description</Button>
        </Style.ExpenseDetailContainer>
        <Marginer direction="vertical" margin="2em" />
        {!isEmptyUser && (
          <Style.ExpenseContainer>
            {expenses.map((expense) => (
              <Expense
                key={expense.id}
                {...expense}
                onDelete={deleteExpense}
                onUpdate={updateExpense}
              />
            ))}
          </Style.ExpenseContainer>
        )}
        <Marginer direction="vertical" margin="5em" />
        {isPopup && <AddForm onAdd={postExpense} handleClose={toggleIsPopup} />}
      </Style.BackGroundFilter>
    </Style.HomePageContainer>
  );
}

// const response = await Axios.get("expenses/filter", {
//   ExpenseSortRequest,
//   // params: {
//   //   ExpenseSortRequest: { type: "merchant" },
//   // },
//   headers: tokenBearer,
// }).catch((err) => {
//   console.log(err);
// });

// console.log(response);
// if (response) {
//   setExpenses(response.data);
// }
