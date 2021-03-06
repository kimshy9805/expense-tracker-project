package com.kay.expensetracker.expense.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kay.expensetracker.user.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "expenses")
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "expense_id"
    )
    private Long id;
    @Column(nullable = false)
    private String merchant;
    @Column(nullable = false)
    private LocalDate date;
    @Column(nullable = false)
    private Long amount;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExpenseCurrency exchangeType;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;
    private String description;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "user_id"
    )
    private User user;

    public Expense(String merchant, LocalDate date, Long amount, ExpenseCurrency exchangeType, ExpenseCategory category, String description) {
        this.merchant = merchant;
        this.date = date;
        this.amount = amount;
        this.exchangeType = exchangeType;
        this.category = category;
        this.description = description;
    }

    //    prevent infinite recursion
    @JsonIgnore
    public User getUser() {
        return user;
    }

    //to get primary key, use getter to generate it for frontend.
    public Long getId() {
        return id;
    }

    public String getMerchant() {
        return merchant;
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getAmount() {
        return amount;
    }

    public ExpenseCurrency getExchangeType() {
        return exchangeType;
    }

    public ExpenseCategory getCategory() {
        return category;
    }

    public String getDescription() {
        return description;
    }
}
