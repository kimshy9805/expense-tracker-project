package com.kay.expensetracker.expense.model;

public enum ExpenseCurrency {
    KRW("Korea"),
    SGD("Singapore"),
    HKD("HoneKong"),
    EUR("Europe"),
    JPY("Japan"),
    USD("America"),
    CNH("China");

    private String text;

    ExpenseCurrency(final String text) {
        this.text = text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

}
