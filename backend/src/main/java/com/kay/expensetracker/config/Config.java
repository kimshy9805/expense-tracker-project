package com.kay.expensetracker.config;


import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Config implements ApplicationRunner {

    @Bean
    @Scope(value = "singleton")
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {

    }
}
