package com.kay.expensetracker.expense.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Category {
    private Long id;
    private ExpenseCategory category;
    private Double amount;
    private Integer numberOfExpenses;

}
