package com.kay.expensetracker.expense;


import com.kay.expensetracker.currency.CurrencyService;
import com.kay.expensetracker.expense.model.Expense;
import com.kay.expensetracker.expense.model.ExpenseCategory;
import com.kay.expensetracker.expense.model.ExpenseRequest;
import com.kay.expensetracker.expense.model.ExpenseSortRequest;
//import com.kay.expensetracker.registration.token.ConfirmationTokenRepository;
import com.kay.expensetracker.user.User;
import com.kay.expensetracker.user.UserRepository;
import com.kay.expensetracker.user.UserRole;
import org.apache.tomcat.jni.Local;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.Month;
import java.time.YearMonth;
import java.util.ArrayList;
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
    @Autowired
    private UserRepository userRepository;
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
        logger.info("hi? " + toBeUpdatedExpense.getMerchant());
        //cannot change amount if conversion is required.
//        if (request.getIsConversionRequired()) {
//            logger.info("hi I am here -------");
//            //TODO check if prev amount and curr amount been changed
//            //TODO if so, send error back.
//            updateExchangeType(toBeUpdatedExpense, request);
//        }
        logger.info("prev " + toBeUpdatedExpense.getMerchant());
        updateAttributes(toBeUpdatedExpense, request);
        logger.info("curr " + toBeUpdatedExpense.getMerchant());

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
//                    if (!request.getIsConversionRequired())
                        toBeUpdatedExpense.setAmount(request.getAmount());
                    break;
                case "exchangeType":
//                    if (!request.getIsConversionRequired())
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

    private List<Expense> getSortedExpense(ExpenseSortRequest request) {
        List<Expense> expenseList = expenseRepository.getAllExpenses();
        return sortByType(expenseList, request);
    }

    private List<Expense> sortByType(List<Expense> expenseList, ExpenseSortRequest request) {
        switch (request.getType()) {
            case ("merchant"):
                return expenseList.stream()
                        .filter(e -> !e.getDate().isAfter(request.getTo()) && !e.getDate().isBefore(request.getFrom()))
                        .sorted(Comparator.comparing(Expense::getMerchant))
                        .collect(Collectors.toList());
            case ("date"):
                return expenseList.stream()
                        .filter(e -> !e.getDate().isAfter(request.getTo()) && !e.getDate().isBefore(request.getFrom()))
                        .sorted(Comparator.comparing(Expense::getDate))
                        .collect(Collectors.toList());
            case("amount"):
                return expenseList.stream()
                        .filter(e -> !e.getDate().isAfter(request.getTo()) && !e.getDate().isBefore(request.getFrom()))
                        .sorted(Comparator.comparing(Expense::getAmount))
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

    //getExpneseList based on month, year, week
    //TODO db query getMonthlyExpenses로 load하는 방법도 해봐야함.
    public List<Expense> getMonthlyExpenses(int month) {
        LocalDate [] daysOfMonth = getFirstAndLastOfMonth(month);
        ExpenseSortRequest request = new ExpenseSortRequest("date", daysOfMonth[0], daysOfMonth[1]);

        return getSortedExpense(request);
    }

    public List<Expense> getSortTypeExpenses(ExpenseSortRequest request) {
        LocalDate [] daysOfMonth = getFirstAndLastOfMonth(request.getMonth());
        request.setFrom(daysOfMonth[0]);
        request.setTo(daysOfMonth[1]);

        return getSortedExpense(request);
    }

    private LocalDate[] getFirstAndLastOfMonth(int month) {
        LocalDate [] daysOfMonth = new LocalDate [2];
        YearMonth yearMonth = YearMonth.of( 2021, month+1 );
        daysOfMonth[0] = yearMonth.atDay( 1 );
        daysOfMonth[1] = yearMonth.atEndOfMonth();

        return daysOfMonth;
    }


//
//    public Long getTotalAmountPerWeek(User user, LocalDate date) {
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
        logger.info("to" + to);
        logger.info("from" + from);
        ExpenseSortRequest request = new ExpenseSortRequest("date", from, to);
        return getSortedExpense(request);
    }

    /*
        Pi-Chart calculation
     */
    public HashMap<ExpenseCategory, DataSet> getPiChart(int month) {
        HashMap<ExpenseCategory, DataSet> piChart = new HashMap<>();
        LocalDate [] daysOfMonth = getFirstAndLastOfMonth(month);
        LocalDate from = daysOfMonth[0];
        LocalDate to = daysOfMonth[1];
        Long totalAmount = 0L;

        logger.info("date " + from + " and " + to);

        //TODO 여기서부터 logic handle하면 될듯. DataSet을 바꾸면될듯. 

        List<Expense> expenseList = expenseRepository.getAllExpenses();
        ExpenseSortRequest request = new ExpenseSortRequest("date", from, to);
        List<Expense> sortedExpenseList = sortByType(expenseList, request);

        logger.info("ang---------------------------------------------------------");
        logger.info("what is sorted? : " + sortedExpenseList.toString());

        for (Expense expense : sortedExpenseList) {
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
//        piChart.forEach((key, value) -> {
//            double percentage = (double) value.getAmount() / (double) finalTotalAmount;
//            logger.info("what is perc?: " + percentage);
//            logger.info(decimalFormat.format(percentage));
////            value.setPercent(Double.parseDouble(decimalFormat.format(percentage)));
//            value.setPercent(percentage);
//        });

        return piChart;
    }

//    public HashMap<ExpenseCategory, DataSet> getPiChart(LocalDate date) {
//        HashMap<ExpenseCategory, DataSet> piChart = new HashMap<>();
//        logger.info("today" + date);
//        Month month = date.getMonth();
//        LocalDate from;
//        LocalDate to;
//        Long totalAmount = 0L;
//
//        if (month == LocalDate.now().getMonth()) {
//            from = date.withDayOfMonth(1);
//            to = date.withDayOfMonth(date.lengthOfMonth());
//        } else {
//            from = date.withDayOfMonth(1);
//            to = date;
//        }
//
//        logger.info("date " + from + " and " + to);
//
//        List<Expense> expenseList = expenseRepository.getAllExpenses();
//        ExpenseSortRequest request = new ExpenseSortRequest("date", from, to);
//        List<Expense> sortedExpenseList = sortByType(expenseList, request);
//
//        for (Expense expense : sortedExpenseList) {
//            if (!piChart.containsKey(expense.getCategory())) {
//                DataSet data = new DataSet(expense.getAmount());
//                piChart.put(expense.getCategory(), data);
//                piChart.get(expense.getCategory()).setAmount(expense.getAmount());
//            } else {
//                Long amount = piChart.getOrDefault(expense.getCategory(), new DataSet((0L))).getAmount() + expense.getAmount();
//                piChart.getOrDefault(expense.getCategory(), new DataSet((0L))).setAmount(amount);
//            }
//            logger.info("piChart: " + expense.getCategory() + " inside " + piChart.get(expense.getCategory()).getAmount());
//            totalAmount += expense.getAmount();
//        }
//
//        Long finalTotalAmount = totalAmount;
//        DecimalFormat decimalFormat = new DecimalFormat("0.00");
//        piChart.forEach((key, value) -> {
//            double percentage = (double) value.getAmount() / (double) finalTotalAmount;
//            logger.info(decimalFormat.format(percentage));
//            value.setPercent(Double.parseDouble(decimalFormat.format(percentage)));
//        });
//
////        logger.info(String.valueOf(piChart.get(ExpenseCategory.CAR).getPercent()));
//        return piChart;
//    }


    public static class DataSet {
        private Long amount;
//        private double percent;

        public DataSet(Long amount) {
            this.amount = amount;
        }

        public Long getAmount() {
            return amount;
        }

        public void setAmount(Long amount) {
            this.amount = amount;
        }

//        public double getPercent() {
//            return percent;
//        }
//
//        public void setPercent(double percent) {
//            this.percent = percent;
//        }
    }
}
