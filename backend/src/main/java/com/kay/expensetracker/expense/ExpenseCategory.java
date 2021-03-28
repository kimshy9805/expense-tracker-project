package com.kay.expensetracker.expense;

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

    private final String text;

    ExpenseCategory(final String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return text;
    }

}
