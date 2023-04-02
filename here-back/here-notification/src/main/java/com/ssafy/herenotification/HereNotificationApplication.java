package com.ssafy.herenotification;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HereNotificationApplication {

    public static void main(String[] args) {
        SpringApplication.run(HereNotificationApplication.class, args);
    }

}
