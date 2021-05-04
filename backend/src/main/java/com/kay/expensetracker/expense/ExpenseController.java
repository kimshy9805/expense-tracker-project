package com.kay.expensetracker.expense;

import com.kay.expensetracker.currency.Currency;
import com.kay.expensetracker.currency.CurrencyDAO;
import com.kay.expensetracker.currency.CurrencyService;
import com.kay.expensetracker.expense.model.*;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;

import static com.kay.expensetracker.expense.ExpenseService.*;

@RestController
@RequestMapping(path = "api/v1/expense-tracker/expenses")
@CrossOrigin(value = "*", allowedHeaders = "*")
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
    public List<Expense> currentPage() {
        return expenseService.getUpToDateExpense();
    }

    @GetMapping(path = "/getAll")
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpense();
    }

    @GetMapping(path = "{id}")
    public Expense getByExpenseId(@PathVariable int id) {
        return expenseService.getByExpenseId(id);
    }

//    @GetMapping(path = "/filter")
//    public List<Expense> getSortedExpense(@RequestBody ExpenseSortRequest request) {
//        return expenseService.getSortedExpense(request);
//    }


    @GetMapping(path = "/total")
    public Long getTotalAmountPerDay(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return expenseService.getTotalAmountPerDay(date);
    }

    @GetMapping(path = "/month/{month}")
    public List<Expense> getMonthlyExpenses(@PathVariable int month) {
        return expenseService.getMonthlyExpenses(month);
    }

    @GetMapping(path = "/select")
    public Long getSelectedAmount(@RequestBody List<Expense> selectedExpense) {
        return expenseService.getSelectedAmount(selectedExpense);
    }

    @GetMapping(path = "/pi")
    public HashMap<ExpenseCategory, DataSet> getPiChart(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return expenseService.getPiChart(date);
    }

    /*
        HTTP POST Method
     */
//    //exception처리해야줘야함.
    //TODO category 없이 post하면 이후에 category를 넣어도 없는상태로 db에 저장됨.
    @PostMapping
    public String insertExpense(@RequestBody ExpenseRequest request) {
        expenseService.insertExpense(request);
        return "success";
    }

    //TODO 원래는 getMapping인데 axios에서 @requestBody를 handle을 못함 get으로는
    //TODO 방법찾아서 getmapping으로
    //TODO axios -> request에서 month returns null. 해결해야함.
    @PostMapping(path = "/filter")
    public List<Expense> getSortedExpense(@RequestBody ExpenseSortRequest request) {
        return expenseService.getSortTypeExpenses(request);
    }

    /*
        HTTP DELETE Method
     */

    @DeleteMapping(path = "/{id}")
    public String deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpenseById(id);
        return "success";
    }

    /*
        HTTP PUT Method
     */

    //isConversionRequired true라면 다르게 handle.
    @PutMapping(path = "/{id}")
    public String updateExpense(@PathVariable Long id, @RequestBody ExpenseRequest request) {
        expenseService.updateExpenseById(id, request);
        return "success";
    }
}