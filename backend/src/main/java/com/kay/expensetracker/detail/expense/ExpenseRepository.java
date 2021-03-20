package com.kay.expensetracker.detail.expense;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

//    @Query(
//            value = "SELECT * FROM expense e WHERE e.app_user_id = ?1",
//            nativeQuery = true
//    )
    @Query(
            value = "SELECT * FROM expense",
            nativeQuery = true
    )
    List<Expense> getAllExpenses();

}
