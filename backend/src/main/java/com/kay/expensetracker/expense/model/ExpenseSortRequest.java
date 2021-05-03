package com.kay.expensetracker.expense.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import java.time.LocalDate;


@NoArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class ExpenseSortRequest {
    private String type;
    @JsonIgnore
    private Integer month;
    @JsonIgnore
    private LocalDate from;
    @JsonIgnore
    private LocalDate to;

    public ExpenseSortRequest(String type, LocalDate from, LocalDate to) {
        this.type = type;
        this.from = from;
        this.to = to;
    }
}
