package com.limmonjuice.prelimsexam.Services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/error", "/").permitAll() // allow access to error page
                        .anyRequest().authenticated()          // everything else requires login
                )
                .formLogin(login -> login
                        .defaultSuccessUrl("/", true)  // redirect after login
                        .permitAll()                  // allow everyone to see login page
                )
                .logout(logout -> logout
                        .permitAll()                  // allow everyone to log out
                );

        return http.build();
    }
}
