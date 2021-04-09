package com.kay.expensetracker.currency;


import com.kay.expensetracker.expense.model.ExpenseCurrency;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CurrencyService {

    @Autowired
    private CurrencyDAO currencyDAO;
    private Map<String, Double> currencyMap;
    Logger logger = LoggerFactory.getLogger(CurrencyService.class);

    public double getCurrencyExchange(long amount, ExpenseCurrency from, ExpenseCurrency to) {
        //TODO autowired 확인
        CurrencyDAO currencyDAO = new CurrencyDAO();

        Currency currency = currencyDAO.getCurrencyInfo();
        currencyMap = new HashMap<>();
        Double fromCurrency;
        Double toCurrency;
        double exchangedAmount;

        getCurrencyMap(currency.getRates());

        if (currencyMap.containsKey(from.toString()) && currencyMap.containsKey(to.toString())) {
            fromCurrency = currencyMap.get(from.toString());
            toCurrency = currencyMap.get(to.toString());
        } else {
            throw new IllegalStateException("no matching currency rates");
        }

        exchangedAmount = convertCurrency(amount, fromCurrency, toCurrency);
        return exchangedAmount;
    }

    private double convertCurrency(long amount, double from, double to) {
        return (double) amount * to / from;
    }

    private void getCurrencyMap(JSONObject currencyList) {
        currencyList.forEach((key, value) -> {
            if (value.getClass() == Integer.class) {
                currencyMap.put((String) key, ((Integer) value).doubleValue());
            } else {
                currencyMap.put((String) key, (Double) value);
            }
        });
    }
}
