package com.kay.expensetracker.expense.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private final ExpenseCurrency exchangeType;
    private final ExpenseCategory category;
    private final String description;
    private Boolean isConversionRequired = false;
}
