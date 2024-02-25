package com.github.moinmarcell.backend.security;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AppUserController {
    private final AppUserRepository appUserRepository;

    @GetMapping("/me")
    public AppUserResponse getMe() {
        var securityContext = SecurityContextHolder.getContext();
        if (!Objects.equals(securityContext.getAuthentication().getName(), "anonymousUser")) {
            AppUser appUser = appUserRepository.findAppUserByUsername(securityContext.getAuthentication().getName())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No User Logged In"));
            return new AppUserResponse(appUser.getUsername(), appUser.getRole());
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No User Logged In");
    }

    @PostMapping("/login")
    public AppUserResponse login() {
        return getMe();
    }
}
