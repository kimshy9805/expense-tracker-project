package com.kay.expensetracker.registration.token;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ConfirmationTokenService {

    @Autowired
    private ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
        //1, check if enables user
        //2. if not enabled, then throw error
        //3.


        //feature0. revenue / expense
        // pie chart + 하루, 일주일, 한달 records 볼수있게.


        //feature1. currencyconversion.
        //foreign exchange rates api
        //https://exchangerate.host/#/#docs
        //singapore -> korea vice versa.

        //feature2. filter and sort

        //feature3. 하루, 주일, 한달기준으로 돈얼마나 썻는지
        //presenting it via pie chart.

        //feature4. revenue + expense




        //feature2. pie chart -> frontendtory.findByToken(token);
    }

    public void setConfirmedAt(String token) {
        confirmationTokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
