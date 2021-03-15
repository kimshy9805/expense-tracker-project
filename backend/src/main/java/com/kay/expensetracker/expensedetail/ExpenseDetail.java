package com.kay.expensetracker.expensedetail;


import com.kay.expensetracker.appuser.AppUser;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="ExpenseDetails")
@Table
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ExpenseDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "serial")
    private Long expenseDetailId;
    private String merchant;
    private LocalDateTime date;
    //could be another table
    private Long spending;
    //enumerate 로 하면될듯.
    private String category;
    private String description;

    //oneToone?
    @ManyToOne
    @JoinColumn(
            nullable = false,
            name = "app_user_id"
    )
    private AppUser appUser;

    public ExpenseDetail(String merchant, LocalDateTime date, Long spending, String category, String description, AppUser appUser) {
        this.merchant = merchant;
        this.date = date;
        this.spending = spending;
        this.category = category;
        this.description = description;
        this.appUser = appUser;
    }


}
