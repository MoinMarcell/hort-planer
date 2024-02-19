package com.github.moinmarcell.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private static final String EVENTS_ENDPOINT = "/api/events";
    private static final String AUTH_ENDPOINT = "/api/auth";

    @Value("${app.url}")
    private String appUrl;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .exceptionHandling(c -> c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .httpBasic(c -> c.authenticationEntryPoint((request, response, authException) -> response.sendError(HttpStatus.UNAUTHORIZED.value(), HttpStatus.UNAUTHORIZED.getReasonPhrase())))
                .logout(c -> c.logoutSuccessUrl(appUrl))
                .authorizeHttpRequests(c -> c
                        .requestMatchers(HttpMethod.POST, EVENTS_ENDPOINT).authenticated()
                        .requestMatchers(HttpMethod.PUT, EVENTS_ENDPOINT + "/*").authenticated()
                        .requestMatchers(HttpMethod.DELETE, EVENTS_ENDPOINT + "/*").authenticated()
                        .requestMatchers(AUTH_ENDPOINT + "/me").authenticated()
                        .anyRequest().permitAll()
                );

        return http.build();
    }

}
