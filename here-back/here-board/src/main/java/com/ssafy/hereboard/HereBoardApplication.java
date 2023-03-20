package com.ssafy.hereboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HereBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(HereBoardApplication.class, args);
    }

}
