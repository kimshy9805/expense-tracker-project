package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/expense-tracker/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping
    public String currentPage(@AuthenticationPrincipal AppUser appUser) {
        System.out.println(appUser.getEmail());
        return "in expenses page";
    }

    @GetMapping(path = "/getAll")
    public List<Expense> getAllExpenses(@AuthenticationPrincipal AppUser appUser) {
        System.out.println(appUser.getId());
        return expenseService.getAllExpense(appUser);
    }

    //@RequestParam? 이용해서도 가능.
    @GetMapping(path = "{id}")
    public Expense getById(Long id) {
        return expenseService.getExpenseById(id);
    }

    @PostMapping
    public String insertExpense(@AuthenticationPrincipal AppUser appUser, @RequestBody ExpenseRequest request) {
        expenseService.insertExpense(appUser, request);
        return "success";
    }

    @DeleteMapping(path = "/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
        return "success";
    }

    @PutMapping(path = "/{id}")
    public String updateExpense(@PathVariable Long id, @RequestBody Expense request) {
        expenseService.updateExpense(id, request);
        return "success";
    }







    //get


    //update




    //delete

}

//logout 안하고 re run해도 website에 쿠키가 남아서 authentication이 없는듯
//logout 해줘라e
//@AuthenticationPrincipal로 현재 login 된 user의 info를 받을수있음.