package com.kay.expensetracker.expense.model;

public enum ExpenseCategory {
    ADVERTISING("advertising"),
    BENEFITS("benefits"),
    CAR("car"),
    EQUIPMENT("equipment"),
    FEES("fees"),
    HOME_OFFICE("homeOffice"),
    INSURANCE("insurance"),
    LABOR("labor"),
    MAINTENANCE("maintenance"),
    MATERIALS("materials"),
    MEALS_AND_ENTERTAINMENT("mealsAndEntertainment"),
    OFFICE_SUPPLIES("officeSupplies"),
    OTHER("other"),
    PROFESSIONAL_SERVICES("professionalServices"),
    RENT("rent"),
    TAXES("taxes"),
    TRAVEL("travel"),
    UTILITIES("utilities");

    private String text;

    ExpenseCategory(final String text) {
        this.text = text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }


}
