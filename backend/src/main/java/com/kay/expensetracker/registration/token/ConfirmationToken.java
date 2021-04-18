//package com.kay.expensetracker.registration.token;
//
//import lombok.*;
//import org.hibernate.annotations.Parent;
//
//import javax.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table
//@Getter
//@Setter
//@EqualsAndHashCode
//@NoArgsConstructor
//public class ConfirmationToken {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(
//            name = "cconfirmation_token_id"
//    )
//    private Long id;
//    @Column(nullable = false)
//    private String token;
//    @Column(nullable = false)
//    private LocalDateTime createdAt;
//    @Column(nullable = false)
//    private LocalDateTime expiresAt;
//    private LocalDateTime confirmedAt;
////    @ManyToOne(fetch = FetchType.LAZY, targetEntity = AppUser.class)
////    @JoinColumn(name = "app_user_id", referencedColumnName = "app_user_id")
////    private AppUser appUser;
//
//
//
//
//    public ConfirmationToken(String token, LocalDateTime createdAt, LocalDateTime expiresAt) {
//        this.token = token;
//        this.createdAt = createdAt;
//        this.expiresAt = expiresAt;
////        this.appUser = appUser;
//    }
//
//
//
//}
//
//
//
//
//
////appUser can have many tokens
////this is foreign key and referce to primary kin
////need to set cascade to persist to have multiple tokens.
////    @ManyToOne(cascade = CascadeType.PERSIST)
////persist all info
////    @ManyToOne(cascade = CascadeType.ALL)
////    @JoinColumn(
////            nullable = false,
////            name = "app_user_id"
////    )
////    private AppUser appUser;
//
////joinColumn should indicate parent table pk.
////이건 fix 더이상 건들지마 이건 맞아.