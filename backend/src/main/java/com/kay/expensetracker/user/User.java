package com.kay.expensetracker.user;


import com.kay.expensetracker.expense.model.Expense;
//import com.kay.expensetracker.registration.token.ConfirmationToken;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@ToString
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(
            name = "user_id"
    )
    private Long id;
    private String fullName;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

//    @OneToMany(
//            mappedBy = "user",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    private List<ConfirmationToken> confirmationTokens = new ArrayList<>();

    //can be hashmap? key: date / value: rest
    @OneToMany(
            mappedBy = "user",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Expense> expense = new ArrayList<>();

    public User(String fullName, String email, String password, UserRole userRole) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.userRole = userRole;
    }

}

//mappedBy는 여기 class 의 이름인가?
//    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<ConfirmationToken> confirmationTokens = new ArrayList<>();
//
//    @OneToMany(cascade=CascadeType.ALL)
//    private List<ConfirmationToken> confirmationTokens;
//todo: 진짜 모르겟음. 왜이러는지... 살려줘
//mappedBy reference an unknown target entity property keep getting this error.
