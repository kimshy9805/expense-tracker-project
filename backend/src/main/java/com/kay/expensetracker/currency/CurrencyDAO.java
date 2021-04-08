package com.kay.expensetracker.currency;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CurrencyDAO {
    private static final String CURRENCY_URL = "https://api.exchangerate.host/latest";
    Logger logger = LoggerFactory.getLogger(CurrencyDAO.class);

    //이게 initialize가 안되서 안되는거였네...
    //bean이 invoke안됬는듯?
    //한번 initial때 run해줘야지 되니깐 application runner로 해보자
    //이름문젠가?? 나중에 확인 고고
//    @Autowired
//    private RestTemplate restTemplate;

    //TODO currency를 변환하면 field + money값도 바뀌기 service에서 구축 내일 고고 
    public Currency getCurrencyInfo() {
        RestTemplate restTemplate = new RestTemplate();

        Currency currency = restTemplate.getForObject(CURRENCY_URL, Currency.class);
        logger.info("hi" + currency.toString());
        logger.info("hey " + currency.getRates().get("SGD"));

        return currency;
    }
}

//restTemplate.exchange() 로 바로 method call해도 될듯? application runner안쓰고
