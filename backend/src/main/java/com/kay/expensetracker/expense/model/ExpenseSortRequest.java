package com.kay.expensetracker.expense.model;

import lombok.*;

import java.time.LocalDate;


@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ExpenseSortRequest {
    private String type;
    private LocalDate from;
    private LocalDate to;

}
