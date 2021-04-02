package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/expense-tracker/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    /*
        HTTP GET Method
     */

    @GetMapping
    public String currentPage(@AuthenticationPrincipal AppUser appUser) {
        System.out.println(appUser.getEmail());
        return "in expenses page";
    }

    @GetMapping(path = "/getAll")
    public List<Expense> getAllExpenses(@AuthenticationPrincipal AppUser appUser) {
        return expenseService.getAllExpense(appUser);
    }

    @GetMapping(path = "{id}")
    public Expense getByExpenseId(@PathVariable int id, @AuthenticationPrincipal AppUser appUser) {
        return expenseService.getByExpenseId(id, appUser);
    }

    @GetMapping(path = "/filter")
    public List<Expense> getSortedExpense(@AuthenticationPrincipal AppUser appUser, @RequestBody ExpenseSortRequest request) {
        return expenseService.getSortedExpense(appUser, request);
    }

    /*
        HTTP POST Method
     */

    @PostMapping
    public String insertExpense(@AuthenticationPrincipal AppUser appUser, @RequestBody ExpenseRequest request) {
        expenseService.insertExpense(appUser, request);
        return "success";
    }

    /*
        HTTP DELETE Method
     */

    @DeleteMapping(path = "/{id}")
    public String deleteExpense(@AuthenticationPrincipal AppUser appUser, @PathVariable Long id) {
        expenseService.deleteExpenseById(appUser, id);
        return "success";
    }

    /*
        HTTP PUT Method
     */

    @PutMapping(path = "/{id}")
    public String updateExpense(@AuthenticationPrincipal AppUser appUser, @PathVariable Long id, @RequestBody ExpenseRequest request) {
        expenseService.updateExpenseById(appUser, id, request);
        return "success";
    }



}

//logout 안하고 re run해도 website에 쿠키가 남아서 authentication이 없는듯
//logout 해줘라e
//@AuthenticationPrincipal로 현재 login 된 user의 info를 받을수있음.