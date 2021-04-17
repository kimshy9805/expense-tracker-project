package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import com.kay.expensetracker.currency.Currency;
import com.kay.expensetracker.currency.CurrencyDAO;
import com.kay.expensetracker.currency.CurrencyService;
import com.kay.expensetracker.expense.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import static com.kay.expensetracker.expense.ExpenseService.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "api/v1/expense-tracker/expenses")
public class ExpenseController {
    Logger logger = LoggerFactory.getLogger(ExpenseController.class);
    @Autowired
    private ExpenseService expenseService;
    @Autowired
    private CurrencyService currencyService;

    /*
        HTTP GET Method
     */

    @GetMapping
    public String cuur() {
        return "hi";
    }
    //TODO AuthenticationPrincipal때문에 이사단남. 
//    @GetMapping
//    public List<Expense> currentPage(@AuthenticationPrincipal AppUser appUser) {
//        return expenseService.getUpToDateExpense(appUser);
//    }

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

    @GetMapping(path = "/total")
    public Long getTotalAmount(@AuthenticationPrincipal AppUser appUser, @RequestBody LocalDate date) {
        return expenseService.getTotalAmountPerDay(appUser, date);
    }

    @GetMapping(path = "/select")
    public Long getSelectedAmount(@AuthenticationPrincipal AppUser appUser, @RequestBody List<Expense> selectedExpense) {
        return expenseService.getSelectedAmount(appUser, selectedExpense);
    }

    @GetMapping(path = "/pi")
    public HashMap<ExpenseCategory, DataSet> getPiChart(@AuthenticationPrincipal AppUser appUser,
                                                        @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return expenseService.getPiChart(appUser, date);
    }

    @GetMapping(path = "/currency")
    public double getCurrency(@RequestParam("amount") long amount,
                            @RequestParam("from") ExpenseCurrency from,
                            @RequestParam("to") ExpenseCurrency to) {
        logger.info("param" + from + " " + to);
        return currencyService.getCurrencyExchange(amount, from, to);
    }

    /*
        HTTP POST Method
     */
    //TODO ㅂ방금 requestbody에서 cateogory해서 넣엇는데 category null로 표기되서 애먹음.
    //exception처리해야줘야함.
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

    //isConversionRequired true라면 다르게 handle.
    @PutMapping(path = "/{id}")
    public String updateExpense(@AuthenticationPrincipal AppUser appUser, @PathVariable Long id, @RequestBody ExpenseRequest request) {
        expenseService.updateExpenseById(appUser, id, request);
        return "success";
    }



}

//logout 안하고 re run해도 website에 쿠키가 남아서 authentication이 없는듯
//logout 해줘라e
//@AuthenticationPrincipal로 현재 login 된 user의 info를 받을수있음.