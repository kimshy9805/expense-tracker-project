package com.kay.expensetracker.expensedetail;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/expense-tracker/record")
public class ExpenseDetailController {

    @Autowired
    private ExpenseDetailService expenseDetailService;




}
