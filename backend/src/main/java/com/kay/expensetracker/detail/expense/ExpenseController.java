package com.kay.expensetracker.detail.expense;


import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/expense-tracker/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    /*
        post request
    */
    //1. plain one
    //Expense needs to have another attribute to verify the user.
    @PostMapping
    public String insertExpense(@RequestBody ExpenseRequest request) {
        expenseService.insertExpense(request);
        return "success";
    }

    //todo 이상한 값이 다뜸... query문제일수도 확인
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpense();
    }






    //get


    //update




    //delete

}
