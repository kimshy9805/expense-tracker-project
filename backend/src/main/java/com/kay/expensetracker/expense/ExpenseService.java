package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import com.kay.expensetracker.appuser.AppUserRepository;
import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.lang.reflect.*;


@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;
    private Expense toBeUpdatedExpense;

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

    public Expense getByExpenseId(int id, AppUser appUser) {
        System.out.println(appUser.getId());
        return expenseRepository.getByExpenseId(id, Math.toIntExact(appUser.getId()));
    }

    public void deleteExpenseById(AppUser appUser, Long id) {
        boolean exists = expenseRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("id does not exist");
        }
        expenseRepository.deleteExpenseById(Math.toIntExact(id), Math.toIntExact(appUser.getId()));
    }

    public void updateExpenseById(AppUser appUser, Long id, ExpenseRequest request) {
        //todo update. iterate? reflection 사용? update가 주 목적. attribute하나씩 확인해야함. 
        Expense toBeUpdatedExpense = expenseRepository.findById(id).get();

        updateAttributes(toBeUpdatedExpense);







//        expenseRepository.updateExpenseById(id, request);
        //        expenseRepository.save(request);
    }

    private void updateAttributes(Expense toBeUpdatedExpense) {
        Field[] fields = toBeUpdatedExpense.getClass().getDeclaredFields();
        for (Field field: fields) {
            System.out.println(field.getName());

        }

        //use stream try



    }





}
