package com.kay.expensetracker.expense;

import org.apache.tomcat.jni.Local;
import org.hibernate.jpa.TypedParameterValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(
            value = "SELECT * FROM expense e WHERE e.app_user_id = :app_user_id",
            nativeQuery = true
    )
    List<Expense> getAllExpenses(@Param("app_user_id") Long id);


    //todo exception handle 해줘야함.
    @Query(
            value = "SELECT * FROM expense e WHERE e.app_user_id = :app_user_id AND e.expense_id = :expense_id",
            nativeQuery = true
    )
    Expense getByExpenseId(@Param("expense_id") int expenseId, @Param("app_user_id") int appId);

    @Transactional
    @Modifying
    @Query(
            value = "DELETE FROM expense e WHERE e.app_user_id = :app_user_id AND e.expense_id = :expense_id",
            nativeQuery = true
    )
    void deleteExpenseById(@Param("expense_id") int expenseId, @Param("app_user_id") int appId);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE expense " +
                    "SET amount = :amount, " +
                    "date = :date, " +
                    "exchange_type = :exchangeType, " +
                    "merchant = :merchant, " +
                    "category = :category, " +
                    "description = :description " +
                    "WHERE expense_id = :expense_id AND app_user_id = :app_user_id",
            nativeQuery = true
    )
    void updateExpenseById(@Param("expense_id") int expenseId, @Param("app_user_id") int appId,
                           @Param("amount") Long amount,
                           @Param("date") LocalDate date,
                           @Param("exchangeType") String exchangeType,
                           @Param("merchant") String merchant,
                           @Param("category") String category,
                           @Param("description") String description
    );
}

//fine query
//    @Transactional
//    @Modifying
//    @Query(
//            value = "UPDATE expense " +
//                    "SET merchant = 'ang why not' " +
//                    "WHERE expense_id = :expense_id AND app_user_id = :app_user_id",
//            nativeQuery = true
//    )
//    void updateExpenseById(@Param("expense_id") int expenseId, @Param("app_user_id") int appId
//    );

