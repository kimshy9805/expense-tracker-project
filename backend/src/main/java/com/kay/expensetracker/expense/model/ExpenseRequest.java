package com.kay.expensetracker.expense.model;


import com.kay.expensetracker.expense.ExpenseCategory;
import lombok.*;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ExpenseRequest {
    private final String merchant;
    private final LocalDate date;
    private final Long amount;
    private final String exchangeType;
    private final ExpenseCategory category;
    private final String description;
}
