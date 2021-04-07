package com.kay.expensetracker.currency;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;

import java.io.Serializable;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Currency implements Serializable {
    private Boolean success;
    private JSONObject rates;
    private String base;

}
