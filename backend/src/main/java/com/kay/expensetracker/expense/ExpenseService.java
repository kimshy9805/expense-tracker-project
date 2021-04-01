package com.kay.expensetracker.expense;


import com.kay.expensetracker.appuser.AppUser;
import com.kay.expensetracker.appuser.AppUserRepository;
import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Service;

import javax.persistence.Converter;
import java.lang.annotation.Annotation;
import java.time.LocalDate;
import java.util.List;
import java.lang.reflect.*;


@Service
public class ExpenseService {
    Logger logger = LoggerFactory.getLogger(ExpenseService.class);

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
                request.getCategory(),
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

    //save method can override different user's data.
    //expenseRepository.save(toBeUpdatedExpense);
    public void updateExpenseById(AppUser appUser, Long id, ExpenseRequest request) {
        Expense toBeUpdatedExpense = expenseRepository.findById(id).get();

//        logger.info("aa" + ExpenseCategory.valueOf(String.valueOf(request.getCategory())));
        logger.info("bb" + ExpenseCategory.valueOf("FEES"));

//        updateAttributes(toBeUpdatedExpense, request);

        logger.info("enum" + toBeUpdatedExpense.getCategory().getText());
//
//        expenseRepository.updateExpenseById(Math.toIntExact(id),
//                Math.toIntExact(appUser.getId()),
//                toBeUpdatedExpense.getAmount(),
//                LocalDate.parse("2021-04-01"),
//                toBeUpdatedExpense.getExchangeType(),
//                toBeUpdatedExpense.getMerchant(),
//                toBeUpdatedExpense.getCategory().toString(),
//                toBeUpdatedExpense.getDescription()
//        );
    }

    private void updateAttributes(Expense toBeUpdatedExpense, ExpenseRequest request) {
        Field[] fields = request.getClass().getDeclaredFields();
        for (Field field : fields) {
            logger.info("updateAttributes: " + field.getName());
            switch (field.getName()) {
                case "merchant":
                    toBeUpdatedExpense.setMerchant(request.getMerchant());
                    break;
                case "date":
                    toBeUpdatedExpense.setDate(request.getDate());
                    break;
                case "amount":
                    toBeUpdatedExpense.setAmount(request.getAmount());
                    break;
                case "exchangeType":
                    toBeUpdatedExpense.setExchangeType(request.getExchangeType());
                    break;
                case "description":
                    toBeUpdatedExpense.setDescription(request.getDescription());
                    break;
                case "category":
                    toBeUpdatedExpense.setCategory(request.getCategory());
                    break;
                default:
                    break;
            }
        }
    }
//
//    @ReadingConverter
//    private static class CategoryConverter implements Converter<String, ExpenseCategory> {
//        @Override
//        private ExpenseCategory convert(final String source) {
//            return ExpenseCategory.fromString(source);
//        }
//    }


}
