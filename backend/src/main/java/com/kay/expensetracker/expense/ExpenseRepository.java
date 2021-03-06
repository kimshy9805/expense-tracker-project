package com.kay.expensetracker.expense;

import com.kay.expensetracker.expense.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(
            value = "SELECT * FROM expenses e",
            nativeQuery = true
    )
    List<Expense> getAllExpenses();

    @Query(
            value = "SELECT * FROM expenses e WHERE e.date = :date",
            nativeQuery = true
    )
    List<Expense> getExpensesPerDay(@Param("date") LocalDate date);

    @Query(
            value = "SELECT * FROM expenses e WHERE date BETWEEN e.date = :start AND e.date = :end",
            nativeQuery = true
    )
    List<Expense> getMonthlyExpenses(@Param("start") LocalDate start, @Param("end") LocalDate end);

    //todo exception handle 해줘야함.
    @Query(
            value = "SELECT * FROM expenses e WHERE e.expense_id = :expense_id",
            nativeQuery = true
    )
    Expense getByExpenseId(@Param("expense_id") int expenseId);

    @Transactional
    @Modifying
    @Query(
            value = "DELETE FROM expenses e WHERE e.expense_id = :expense_id",
            nativeQuery = true
    )
    void deleteExpenseById(@Param("expense_id") int expenseId);

    @Transactional
    @Modifying
    @Query(
            value = "UPDATE expenses " +
                    "SET amount = :amount, " +
                    "date = :date, " +
                    "exchange_type = :exchangeType, " +
                    "merchant = :merchant, " +
                    "category = :category, " +
                    "description = :description " +
                    "WHERE expense_id = :expense_id",
            nativeQuery = true
    )
    void updateExpenseById(@Param("expense_id") int expenseId,
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

