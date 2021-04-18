package com.kay.expensetracker.expense;


import com.kay.expensetracker.currency.CurrencyService;
import com.kay.expensetracker.expense.model.Expense;
import com.kay.expensetracker.expense.model.ExpenseCategory;
import com.kay.expensetracker.expense.model.ExpenseRequest;
import com.kay.expensetracker.expense.model.ExpenseSortRequest;
//import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.Month;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.lang.reflect.*;
import java.util.stream.Collectors;


@Service
public class ExpenseService {
    Logger logger = LoggerFactory.getLogger(ExpenseService.class);

    @Autowired
    private ExpenseRepository expenseRepository;
    //    @Autowired
//    private AppUserRepository appUserRepository;
//    @Autowired
//    private ConfirmationTokenRepository confirmationTokenRepository;
    @Autowired
    private CurrencyService currencyService;
    private Expense toBeUpdatedExpense;

    public void insertExpense(ExpenseRequest request) {
        //todo if duplicate then throw exception
        logger.info("this is live test", +request.getAmount());
        Expense newRequest = new Expense(
                request.getMerchant(),
                request.getDate(),
                request.getAmount(),
                request.getExchangeType(),
                request.getCategory(),
                request.getDescription()
        );
        expenseRepository.save(newRequest);
    }

    public List<Expense> getAllExpense() {
        return expenseRepository.getAllExpenses();
    }

    public Expense getByExpenseId(int id) {
        return expenseRepository.getByExpenseId(id);
    }

    public void deleteExpenseById(Long id) {
        boolean exists = expenseRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("id does not exist");
        }
        expenseRepository.deleteExpenseById(Math.toIntExact(id));
    }

    public void updateExpenseById(Long id, ExpenseRequest request) {
        Expense toBeUpdatedExpense = expenseRepository.findById(id).get();

        //cannot change amount if conversion is required.
        if (request.getIsConversionRequired()) {
            logger.info("hi I am here -------");
            updateExchangeType(toBeUpdatedExpense, request);
        }

        updateAttributes(toBeUpdatedExpense, request);

        expenseRepository.updateExpenseById(Math.toIntExact(id),
                toBeUpdatedExpense.getAmount(),
                toBeUpdatedExpense.getDate(),
                toBeUpdatedExpense.getExchangeType().toString(),
                toBeUpdatedExpense.getMerchant(),
                toBeUpdatedExpense.getCategory().toString(),
                toBeUpdatedExpense.getDescription()
        );
    }

    //TODO 해당 attribute가 request에 없을시 ignore하는 property필요.
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
                    if (!request.getIsConversionRequired())
                        toBeUpdatedExpense.setAmount(request.getAmount());
                    break;
                case "exchangeType":
                    if (!request.getIsConversionRequired())
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

    private void updateExchangeType(Expense toBeUpdatedExpense, ExpenseRequest request) {
        double exchangedAmount = currencyService.getCurrencyExchange(toBeUpdatedExpense.getAmount(),
                toBeUpdatedExpense.getExchangeType(), request.getExchangeType());
        toBeUpdatedExpense.setExchangeType(request.getExchangeType());
        toBeUpdatedExpense.setAmount(Math.round(exchangedAmount));
    }

    /*
        sort operation
     */
    public List<Expense> getSortedExpense(ExpenseSortRequest request) {
        List<Expense> expenseList = expenseRepository.getAllExpenses();
        logger.info("list" + expenseList.toString());
        return sortByType(expenseList, request);
    }

    private List<Expense> sortByType(List<Expense> expenseList, ExpenseSortRequest request) {
        switch (request.getType()) {
            case ("category"):
                expenseList.sort(Comparator.comparing(Expense::getCategory));
                break;
            case ("merchant"):
                expenseList.sort(Comparator.comparing(Expense::getMerchant));
                break;
            case ("date"):
                return expenseList.stream()
                        .filter(e -> !e.getDate().isAfter(request.getTo()) && !e.getDate().isBefore(request.getFrom()))
                        .sorted(Comparator.comparing(Expense::getDate))
                        .collect(Collectors.toList());
            default:
                break;
        }
        return expenseList;
    }

    /*
        record tracking
     */

    public Long getTotalAmountPerDay(LocalDate date) {
        List<Expense> expenseList = expenseRepository.getExpensesPerDay(date);

        if (expenseList == null) {
            throw new IllegalStateException("no available records given date");
        }

        Long totalAmount = expenseList.stream()
                .map(e -> e.getAmount())
                .reduce(0L, Long::sum);

        return totalAmount;
    }

    //TODO expensify 에서 어캐 하는지 확인 이것도 있고
    //getExpneseList based on month, year, week
//
//    public Long getTotalAmountPerWeek(AppUser appUser, LocalDate date) {
//        return 34343L;
//    }
//
//    public Long getTotalAmountPerMonth() {
//
//        return Long.valueOf(43343);
//    }
//
//    public Long getTotalAmountPerYear() {
//        return Long.valueOf(4343);
//    }
//
    public Long getSelectedAmount(List<Expense> selectedExpense) {
        Long selectedAmount = selectedExpense.stream()
                .map(e -> e.getAmount())
                .reduce(0L, Long::sum);
        return selectedAmount;
    }

    //TODO reverse the order
    public List<Expense> getUpToDateExpense() {
        LocalDate to = LocalDate.now();
        LocalDate from = to.withDayOfMonth(1);
        ExpenseSortRequest request = new ExpenseSortRequest("date", from, to);
        return getSortedExpense(request);
    }

    /*
        Pi-Chart calculation
     */

    public HashMap<ExpenseCategory, DataSet> getPiChart (LocalDate date){
        HashMap<ExpenseCategory, DataSet> piChart = new HashMap<>();
        logger.info("today" + date);
        Month month = date.getMonth();
        LocalDate from;
        LocalDate to;
        Long totalAmount = 0L;

        if (month == LocalDate.now().getMonth()) {
            from = date.withDayOfMonth(1);
            to = date.withDayOfMonth(date.lengthOfMonth());
        } else {
            from = date.withDayOfMonth(1);
            to = date;
        }

        logger.info("date " + from + " and " + to);

        List<Expense> expenseList = expenseRepository.getAllExpenses();
        ExpenseSortRequest request = new ExpenseSortRequest("date", from, to);
        List<Expense> sortedExpenseList = sortByType(expenseList, request);

        for (Expense expense: sortedExpenseList) {
            if (!piChart.containsKey(expense.getCategory())) {
                DataSet data = new DataSet(expense.getAmount());
                piChart.put(expense.getCategory(), data);
                piChart.get(expense.getCategory()).setAmount(expense.getAmount());
            } else {
                Long amount = piChart.getOrDefault(expense.getCategory(), new DataSet((0L))).getAmount() + expense.getAmount();
                piChart.getOrDefault(expense.getCategory(), new DataSet((0L))).setAmount(amount);
            }
            logger.info("piChart: " + expense.getCategory() + " inside " + piChart.get(expense.getCategory()).getAmount());
            totalAmount += expense.getAmount();
        }

        Long finalTotalAmount = totalAmount;
        DecimalFormat decimalFormat = new DecimalFormat("0.00");
        piChart.forEach((key, value) -> {
            double percentage = (double) value.getAmount() / (double) finalTotalAmount;
            logger.info(decimalFormat.format(percentage));
            value.setPercent(Double.parseDouble(decimalFormat.format(percentage)));
        });

//        logger.info(String.valueOf(piChart.get(ExpenseCategory.CAR).getPercent()));
        return piChart;
    }

    public static class DataSet {
        private Long amount;
        private double percent;

        public DataSet(Long amount) {
            this.amount = amount;
        }

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }

        public double getPercent() {
            return percent;
        }

        public void setPercent(double percent) {
            this.percent = percent;
        }
    }
}
