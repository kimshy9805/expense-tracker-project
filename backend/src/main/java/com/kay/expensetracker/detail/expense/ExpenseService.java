package com.kay.expensetracker.detail.expense;


import com.kay.expensetracker.appuser.AppUser;
import com.kay.expensetracker.appuser.AppUserRepository;
import com.kay.expensetracker.appuser.AppUserRole;
import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    /*
        post service
    */
    public void insertExpense(AppUser appUser, ExpenseRequest request) {
        Expense newRequest = new Expense(
                request.getMerchant(),
                request.getDate(),
                request.getAmount(),
                request.getExchangeType(),
                ExpenseCategory.FEES,
                request.getDescription(),
//                confirmationTokenRepository.getAllTokens(appUser.getId())
                appUserRepository.findByEmail(appUser.getEmail()).get()
        );

        expenseRepository.save(newRequest);
    }

    public List<Expense> getAllExpense() {
        //todo need to pass appUser_id here
        return expenseRepository.getAllExpenses();
    }






}
