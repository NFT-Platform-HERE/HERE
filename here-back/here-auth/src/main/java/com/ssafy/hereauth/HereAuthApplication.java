package com.ssafy.hereauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HereAuthApplication {

	public static void main(String[] args) {
		SpringApplication.run(HereAuthApplication.class, args);
	}

}
