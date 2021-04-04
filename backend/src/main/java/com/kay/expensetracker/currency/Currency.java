package com.kay.expensetracker.currency;

import lombok.Data;
import org.springframework.boot.configurationprocessor.json.JSONObject;

@Data
public class Currency {
    private JSONObject rates;

}
