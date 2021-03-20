package com.kay.expensetracker.detail.expense;


import com.kay.expensetracker.appuser.AppUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Expense {

    //todo delete 하니깐 id가 1부터 안생김. 확인
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
    private String exchangeType;
    //could be another referenced table.
    @Enumerated(EnumType.STRING)
    private ExpenseCategory category;
    private String description;

    //oneToone (foreign key + owner of this relationship)
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = AppUser.class)
    @JoinColumn(
            name = "app_user_id",
            referencedColumnName = "app_user_id"
    )
    private AppUser appUser;

    public Expense(String merchant, LocalDate date, Long amount, String exchangeType, ExpenseCategory category, String description, AppUser appUser) {
        this.merchant = merchant;
        this.date = date;
        this.amount = amount;
        this.exchangeType = exchangeType;
        this.category = category;
        this.description = description;
        this.appUser = appUser;
    }
}
