package com.kay.expensetracker.currency;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class CurrencyDAO {
    private static final String CURRENCY_URL = "https://api.exchangerate.host/latest";
    Logger logger = LoggerFactory.getLogger(CurrencyDAO.class);

    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<String> getCurrencyInfo() {
        //TODO make class model for this.
        //TODO the url returns null. Need to resolve
        ResponseEntity<String> response
                = restTemplate.getForEntity(CURRENCY_URL, String.class);
        logger.info("res " + response);
        return response;
    }

    //        return restTemplate.getForObject(Url, );

}
