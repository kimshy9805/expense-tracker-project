package com.kay.expensetracker.expense;

import org.hibernate.jpa.TypedParameterValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query(
            value = "SELECT * FROM expense e WHERE e.app_user_id = ?1",
            nativeQuery = true
    )
    List<Expense> getAllExpenses(Long id);

    @Query(
            value = "SELECT * FROM expense e WHERE e.expense_id = ?1",
            nativeQuery = true
    )
    Expense getExpenseById(@Param("expense_id") TypedParameterValue id);

    @Query(
            value = "DELETE * FROM expense e WHERE e.expense_id = ?1",
            nativeQuery = true
    )
    void deleteExpense(Long id);

    //could be done through expenseRepository.save()
    @Transactional
    @Modifying
    @Query(
            value = "UPDATE Expense e" +
                    "SET e.amount = expense.amount" +
                    " e.category = expense.category" +
                    " e.date = expense.date" +
                    " e.description = expense.description" +
                    " e.exchange_type = expense.exchangeType" +
                    " e.merchant = expense.merchant" +
                    "WHERE e.expense_id = 1?",
            nativeQuery = true
    )
    void updateExpense(Long id, Expense expense);
}
