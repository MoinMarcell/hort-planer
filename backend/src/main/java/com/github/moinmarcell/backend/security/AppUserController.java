package com.github.moinmarcell.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AppUserController {
    @GetMapping("/me")
    public String getMe() {
        var securityContext = SecurityContextHolder.getContext();
        return securityContext.getAuthentication().getName();
    }
}
