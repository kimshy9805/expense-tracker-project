package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import com.kay.expensetracker.appuser.AppUserRepository;
import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import com.sun.xml.bind.v2.TODO;
import org.hibernate.jpa.TypedParameterValue;
import org.hibernate.type.PostgresUUIDType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;


@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    public void insertExpense(AppUser appUser, ExpenseRequest request) {
        //todo if duplicate then throw exception
        Expense newRequest = new Expense(
                request.getMerchant(),
                request.getDate(),
                request.getAmount(),
                request.getExchangeType(),
                ExpenseCategory.FEES,
                request.getDescription(),
                appUserRepository.findByEmail(appUser.getEmail()).get()
        );

        expenseRepository.save(newRequest);
    }

    public List<Expense> getAllExpense(AppUser appUser) {
        return expenseRepository.getAllExpenses(appUser.getId());
    }

    //TODO 여기서 부터 하면됨. id가 bytea -> bigint cast 불가능.
    public Expense getExpenseById(Long id) {
        TypedParameterValue userIdParam = new TypedParameterValue(new PostgresUUIDType(), id);
//        userRepository.findByNameAndId(userName, userIdParam);

        return expenseRepository.getExpenseById(userIdParam);
    }

    public void deleteExpense(Long id) {
        boolean exists = expenseRepository.existsById(id);
        if (exists) {
            throw new IllegalStateException("id does not exist");
        }
        expenseRepository.deleteById(id);
    }

    public void updateExpense(Long id, Expense request) {
        expenseRepository.updateExpense(id, request);
        //        expenseRepository.save(request);
    }

}
