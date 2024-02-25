package com.github.moinmarcell.backend.security;

public record AppUserResponse(
        String username,
        AppUserRole role
) {
}
