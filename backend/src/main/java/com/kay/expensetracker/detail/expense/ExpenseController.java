package com.kay.expensetracker.detail.expense;


import com.kay.expensetracker.appuser.AppUser;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
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
    //todo after resolve forbidden.
    @PostMapping
    public String insertExpense(@AuthenticationPrincipal AppUser appUser, @RequestBody ExpenseRequest request) {
        expenseService.insertExpense(appUser, request);
        return "success";
    }

    //todo 이상한 값이 다뜸... query문제일수도 확인
//    @GetMapping
//    public List<Expense> getAllExpenses() {
//        return expenseService.getAllExpense();
//    }

    //logout 안하고 re run해도 website에 쿠키가 남아서 authentication이 없는듯
    //logout 해줘라e
    //@AuthenticationPrincipal로 현재 login 된 user의 info를 받을수있음.
   @GetMapping
    public String currentPage(@AuthenticationPrincipal AppUser appUser) {
        System.out.println(appUser.getEmail());
        return "in expenses page";
    }







    //get


    //update




    //delete

}
