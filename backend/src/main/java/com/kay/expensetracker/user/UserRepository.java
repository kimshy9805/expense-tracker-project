package com.kay.expensetracker.user;

//import com.kay.expensetracker.registration.token.ConfirmationToken;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query(
            value = "SELECT * FROM user u WHERE u.email = :email",
            nativeQuery = true
    )
    User getByEmail(@Param("email")String email);
//
//    @Query(
//            value = "SELECT * FROM expense e WHERE e.user_id = :user_id",
//            nativeQuery = true
//    )
//    Expense getByExpenseId(@Param("expense_id") int expenseId);

//    @Query(
//            value = "SELECT a.last_name FROM app_user a WHERE a.last_name = ?1",
//            nativeQuery = true
//    )
//    String findByLastName(String lastName);
//
//    @Query(
//            value = "SELECT a.first_name FROM app_user a WHERE a.first_name = ?1",
//            nativeQuery = true
//    )
//    String findByFirstName(String firstName);

//
//    @Transactional
//    @Modifying
//    @Query("UPDATE User a " +
//            "SET a.enabled = TRUE WHERE a.email = ?1")
//    void enableAppUser(String email);



}
