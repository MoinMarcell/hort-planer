package com.github.moinmarcell.backend.security;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@RestController
@RequestMapping("/api/auth")
public class AppUserController {
    @GetMapping("/me")
    public String getMe() {
        var securityContext = SecurityContextHolder.getContext();
        if (!Objects.equals(securityContext.getAuthentication().getName(), "anonymousUser")) {
            return securityContext.getAuthentication().getName();
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No User Logged In");
    }

    @PostMapping("/login")
    public String login() {
        return getMe();
    }
}
